function getReactiveHookCallbackIndex(node) {
  if (node.type !== 'Identifier') {
    return -1;
  }

  switch (node.name) {
    case 'useSWR':
    case 'useSuspendedSWR':
    case 'useQuery':
      return 1;
    default:
      return -1;
  }
}

/**
 * React 에서 가져옴
 * Mark a node as either optional or required.
 * Note: If the node argument is an OptionalMemberExpression, it doesn't necessarily mean it is optional.
 * It just means there is an optional member somewhere inside.
 * This particular node might still represent a required member, so check .optional field.
 */
function markNode(node, optionalChains, result) {
  if (optionalChains) {
    if (node.optional) {
      // We only want to consider it optional if *all* usages were optional.
      if (!optionalChains.has(result)) {
        // Mark as (maybe) optional. If there's a required usage, this will be overridden.
        optionalChains.set(result, true);
      }
    } else {
      // Mark as required.
      optionalChains.set(result, false);
    }
  }
}

function isSameIdentifier(a, b) {
  return (
    (a.type === 'Identifier' || a.type === 'JSXIdentifier') &&
    a.type === b.type &&
    a.name === b.name &&
    a.range[0] === b.range[0] &&
    a.range[1] === b.range[1]
  );
}

function isAncestorNodeOf(a, b) {
  return a.range[0] <= b.range[0] && a.range[1] >= b.range[1];
}

function isNodeLike(val) {
  return typeof val === 'object' && val !== null && !Array.isArray(val) && typeof val.type === 'string';
}

/**
 * ESLint won't assign node.parent to references from context.getScope()
 *
 * So instead we search for the node from an ancestor assigning node.parent
 * as we go. This mutates the AST.
 *
 * This traversal is:
 * - optimized by only searching nodes with a range surrounding our target node
 * - agnostic to AST node types, it looks for `{ type: string, ... }`
 */
function fastFindReferenceWithParent(start, target) {
  const queue = [start];
  let item = null;

  while (queue.length) {
    item = queue.shift();

    if (isSameIdentifier(item, target)) {
      return item;
    }

    if (!isAncestorNodeOf(item, target)) {
      continue;
    }

    for (const [key, value] of Object.entries(item)) {
      if (key === 'parent') {
        continue;
      }
      if (isNodeLike(value)) {
        value.parent = item;
        queue.push(value);
      } else if (Array.isArray(value)) {
        value.forEach(val => {
          if (isNodeLike(val)) {
            val.parent = item;
            queue.push(val);
          }
        });
      }
    }
  }

  return null;
}

/**
 * React 에서 가져옴
 * Assuming () means the passed node.
 * (foo) -> 'foo'
 * foo(.)bar -> 'foo.bar'
 * foo.bar(.)baz -> 'foo.bar.baz'
 * Otherwise throw.
 */
function analyzePropertyChain(node, optionalChains) {
  if (node.type === 'Identifier' || node.type === 'JSXIdentifier') {
    const result = node.name;
    if (optionalChains) {
      // Mark as required.
      optionalChains.set(result, false);
    }
    return result;
  } else if (node.type === 'MemberExpression' && !node.computed) {
    const object = analyzePropertyChain(node.object, optionalChains);
    const property = analyzePropertyChain(node.property, null);
    const result = `${object}.${property}`;
    markNode(node, optionalChains, result);
    return result;
  } else if (node.type === 'OptionalMemberExpression' && !node.computed) {
    const object = analyzePropertyChain(node.object, optionalChains);
    const property = analyzePropertyChain(node.property, null);
    const result = `${object}.${property}`;
    markNode(node, optionalChains, result);
    return result;
  } else if (node.type === 'ChainExpression' && !node.computed) {
    const expression = node.expression;

    if (expression.type === 'CallExpression') {
      throw new Error(`Unsupported node type: ${expression.type}`);
    }

    const object = analyzePropertyChain(expression.object, optionalChains);
    // 재귀함수 못잡는 버그가 있음
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const property = analyzePropertyChain(expression.property, null);
    const result = `${object}.${property}`;
    markNode(expression, optionalChains, result);
    return result;
  } else {
    throw new Error(`Unsupported node type: ${node.type}`);
  }
}

/**
 * Assuming () means the passed/returned node:
 * (props) => (props)
 * props.(foo) => (props.foo)
 * props.foo.(bar) => (props).foo.bar
 * props.foo.bar.(baz) => (props).foo.bar.baz
 */
function getDependency(node) {
  if (
    (node.parent.type === 'MemberExpression' || node.parent.type === 'OptionalMemberExpression') &&
    node.parent.object === node &&
    node.parent.property.name !== 'current' &&
    !node.parent.computed &&
    !(
      node.parent.parent != null &&
      (node.parent.parent.type === 'CallExpression' || node.parent.parent.type === 'OptionalCallExpression') &&
      node.parent.parent.callee === node.parent
    )
  ) {
    return getDependency(node.parent);
  } else if (
    // Note: we don't check OptionalMemberExpression because it can't be LHS.
    node.type === 'MemberExpression' &&
    node.parent &&
    node.parent.type === 'AssignmentExpression' &&
    node.parent.left === node
  ) {
    return node.object;
  } else {
    return node;
  }
}

// The meat of the logic.
function collectRecommendations({ dependencies, declaredDependencies }) {
  // Our primary data structure.
  // It is a logical representation of property chains:
  // `props` -> `props.foo` -> `props.foo.bar` -> `props.foo.bar.baz`
  //         -> `props.lol`
  //         -> `props.huh` -> `props.huh.okay`
  //         -> `props.wow`
  // We'll use it to mark nodes that are *used* by the programmer,
  // and the nodes that were *declared* as deps. Then we will
  // traverse it to learn which deps are missing or unnecessary.
  const depTree = createDepTree();
  function createDepTree() {
    return {
      isUsed: false, // True if used in code
      isSatisfiedRecursively: false, // True if specified in deps
      isSubtreeUsed: false, // True if something deeper is used by code
      children: new Map(), // Nodes for properties
    };
  }

  // Mark all required nodes first.
  // Imagine exclamation marks next to each used deep property.
  dependencies.forEach((_, key) => {
    const node = getOrCreateNodeByPath(depTree, key);
    node.isUsed = true;
    markAllParentsByPath(depTree, key, parent => {
      parent.isSubtreeUsed = true;
    });
  });

  // Mark all satisfied nodes.
  // Imagine checkmarks next to each declared dependency.
  declaredDependencies.forEach(({ key }) => {
    const node = getOrCreateNodeByPath(depTree, key);
    node.isSatisfiedRecursively = true;
  });

  // Tree manipulation helpers.
  function getOrCreateNodeByPath(rootNode, path) {
    const keys = path.split('.');
    let node = rootNode;
    for (const key of keys) {
      let child = node.children.get(key);
      if (!child) {
        child = createDepTree();
        node.children.set(key, child);
      }
      node = child;
    }
    return node;
  }
  function markAllParentsByPath(rootNode, path, fn) {
    const keys = path.split('.');
    let node = rootNode;
    for (const key of keys) {
      const child = node.children.get(key);
      if (!child) {
        return;
      }
      fn(child);
      node = child;
    }
  }

  // Now we can learn which dependencies are missing or necessary.
  const missingDependencies = new Set();
  const satisfyingDependencies = new Set();
  scanTreeRecursively(depTree, missingDependencies, satisfyingDependencies, key => key);
  function scanTreeRecursively(node, missingPaths, satisfyingPaths, keyToPath) {
    node.children.forEach((child, key) => {
      const path = keyToPath(key);
      if (child.isSatisfiedRecursively) {
        if (child.isSubtreeUsed) {
          // Remember this dep actually satisfied something.
          satisfyingPaths.add(path);
        }
        // It doesn't matter if there's something deeper.
        // It would be transitively satisfied since we assume immutability.
        // `props.foo` is enough if you read `props.foo.id`.
        return;
      }
      if (child.isUsed) {
        // Remember that no declared deps satisfied this node.
        missingPaths.add(path);
        // If we got here, nothing in its subtree was satisfied.
        // No need to search further.
        return;
      }
      scanTreeRecursively(child, missingPaths, satisfyingPaths, childKey => path + '.' + childKey);
    });
  }

  // Collect suggestions in the order they were originally specified.
  const suggestedDependencies = [];
  const duplicateDependencies = new Set();
  declaredDependencies.forEach(({ key }) => {
    // Does this declared dep satisfy a real need?
    if (satisfyingDependencies.has(key)) {
      if (suggestedDependencies.indexOf(key) === -1) {
        // Good one.
        suggestedDependencies.push(key);
      } else {
        // Duplicate.
        duplicateDependencies.add(key);
      }
    }
  });

  // Then add the missing ones at the end.
  missingDependencies.forEach(key => {
    suggestedDependencies.push(key);
  });

  return {
    duplicateDependencies,
    suggestedDependencies,
    missingDependencies,
  };
}

module.exports = {
  type: 'suggestion',
  docs: {
    description: 'verifies the list of dependencies for Hooks like useSWR and similar',
    category: 'Best Practices',
    recommended: true,
  },
  create(context) {
    const scopeManager = context.getSourceCode().scopeManager;

    function visitFunctionWithDependencies(node, declaredDependenciesNode) {
      // Get the current scope.
      const scope = scopeManager.acquire(node);

      // Find all our "pure scopes". On every re-render of a component these
      // pure scopes may have changes to the variables declared within. So all
      // variables used in our reactive hook callback but declared in a pure
      // scope need to be listed as dependencies of our reactive hook callback.
      //
      // According to the rules of React you can't read a mutable value in pure
      // scope. We can't enforce this in a lint so we trust that all variables
      // declared outside of pure scope are indeed frozen.
      const pureScopes = new Set();
      let componentScope = null;
      {
        let currentScope = scope.upper;
        while (currentScope) {
          pureScopes.add(currentScope);
          if (currentScope.type === 'function') {
            break;
          }
          currentScope = currentScope.upper;
        }
        // If there is no parent function scope then there are no pure scopes.
        // The ones we've collected so far are incorrect. So don't continue with
        // the lint.
        if (!currentScope) {
          return;
        }
        componentScope = currentScope;
      }

      // Get dependencies from all our resolved references in pure scopes.
      // Key is dependency string, value is whether it's stable.
      const dependencies = new Map();
      const optionalChains = new Map();
      gatherDependenciesRecursively(scope);

      // React 에서 가져옴
      function gatherDependenciesRecursively(currentScope) {
        for (const reference of currentScope.references) {
          // If this reference is not resolved or it is not declared in a pure
          // scope then we don't care about this reference.
          if (!reference.resolved) {
            continue;
          }
          if (!pureScopes.has(reference.resolved.scope)) {
            continue;
          }

          // Narrow the scope of a dependency if it is, say, a member expression.
          // Then normalize the narrowed dependency.
          const referenceNode = fastFindReferenceWithParent(node, reference.identifier);
          const dependencyNode = getDependency(referenceNode);
          const dependency = analyzePropertyChain(dependencyNode, optionalChains);

          if (dependencyNode.parent.type === 'TSTypeQuery' || dependencyNode.parent.type === 'TSTypeReference') {
            continue;
          }

          const def = reference.resolved.defs[0];
          if (def == null) {
            continue;
          }
          // Ignore references to the function itself as it's not defined yet.
          if (def.node != null && def.node.init === node.parent) {
            continue;
          }
          // Ignore Flow type parameters
          if (def.type === 'TypeParameter') {
            continue;
          }

          // Add the dependency to a map so we can make sure it is referenced
          // again in our dependencies array. Remember whether it's stable.
          if (!dependencies.has(dependency)) {
            dependencies.set(dependency, {
              references: [reference],
            });
          } else {
            dependencies.get(dependency).references.push(reference);
          }
        }

        for (const childScope of currentScope.childScopes) {
          gatherDependenciesRecursively(childScope);
        }
      }

      if (!declaredDependenciesNode) {
        // TODO: deps 없을때 경고
        return;
      }

      if (declaredDependenciesNode.type !== 'ArrayExpression') {
        // TODO: Array가 아닐때 경고
        return;
      }

      const declaredDependencies = [];
      const externalDependencies = new Set();
      declaredDependenciesNode.elements.forEach(declaredDependencyNode => {
        // Skip elided elements.
        if (declaredDependencyNode === null) {
          return;
        }

        // If we see a spread element then add a special warning.
        if (declaredDependencyNode.type === 'SpreadElement') {
          // TODO: 경고주기
          return;
        }

        // Try to normalize the declared dependency. If we can't then an error
        // will be thrown. We will catch that error and report an error.
        let declaredDependency;
        try {
          declaredDependency = analyzePropertyChain(declaredDependencyNode, null);
        } catch (error) {
          if (/Unsupported node type/.test(error.message)) {
            // TODO: 각종 경고 추가
            return;
          } else {
            throw error;
          }
        }

        let maybeID = declaredDependencyNode;
        while (
          maybeID.type === 'MemberExpression' ||
          maybeID.type === 'OptionalMemberExpression' ||
          maybeID.type === 'ChainExpression'
        ) {
          maybeID = maybeID.object || maybeID.expression.object;
        }
        const isDeclaredInComponent = !componentScope.through.some(ref => ref.identifier === maybeID);

        // Add the dependency to our declared dependency map.
        declaredDependencies.push({
          key: declaredDependency,
          node: declaredDependencyNode,
        });

        if (!isDeclaredInComponent) {
          externalDependencies.add(declaredDependency);
        }
      });

      const { missingDependencies, duplicateDependencies } = collectRecommendations({
        dependencies,
        declaredDependencies,
        externalDependencies,
      });

      if (missingDependencies.size > 0) {
        context.report({
          node: declaredDependenciesNode,
          message: `${[...missingDependencies].map(dep => `'${dep}'`).join(', ')}가 의존성 목록에 존재하지 않습니다`,
        });
      }

      if (duplicateDependencies.size > 0) {
        context.report({
          node: declaredDependenciesNode,
          message: `${[...duplicateDependencies].map(dep => `'${dep}'`).join(', ')}가 의존성 목록에 중복되어 있습니다`,
        });
      }
    }

    function visitCallExpression(node) {
      // TODO: (순서 옵션 받기)
      const callbackIndex = getReactiveHookCallbackIndex(node.callee);
      if (callbackIndex < 0) {
        return;
      }

      const callback = node.arguments[callbackIndex];
      if (callback == null) {
        // TODO: 경고주기
        return;
      }

      // TODO: 이것도 옵션 받기
      const declaredDependenciesNode = node.arguments[callbackIndex - 1];
      if (declaredDependenciesNode == null) {
        // TODO: 경고주기
        return;
      }

      switch (callback.type) {
        // NOTE: FunctionExpression => useSWR([], function() {});
        // NOTE: ArrowFunctionExpression => useSWR([], () => {});
        case 'FunctionExpression':
        case 'ArrowFunctionExpression':
          visitFunctionWithDependencies(callback, declaredDependenciesNode);
          return;
        default:
          // TODO: 아직 처리못하는 케이스
          // const callback = () => {...};
          // useSWR(callback, [])
          // useSWR([], generateEffectBody());
          return;
      }
    }

    return {
      CallExpression: visitCallExpression,
    };
  },
};
