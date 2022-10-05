const schema = [
  {
    type: 'object',
    additionalProperties: false,
  },
];

function create(context) {
  return {
    AssignmentExpression: function (node) {
      if (!isWindowLocationHref(node.left)) {
        return;
      }

      if (isTossCoreURLsEnsureCall(node.right)) {
        return;
      }

      if (isPermittedURL(node.right)) {
        return;
      }

      context.report({
        node,
        messageId: 'recommendSafeNavigation',
      });
    },
    CallExpression: function (node) {
      if (!isURLsNavigateTo(node)) {
        return;
      }

      if (isTossCoreURLsEnsureCall(node.arguments[0])) {
        return;
      }

      if (isPermittedURL(node.arguments[0])) {
        return;
      }

      context.report({
        node,
        messageId: 'recommendSafeNavigation',
      });
    },
  };
}

function isWindowLocationHref(expr) {
  return (
    expr.type === 'MemberExpression' &&
    expr.property.type === 'Identifier' &&
    expr.property.name === 'href' &&
    expr.object.type === 'MemberExpression' &&
    expr.object.property.type === 'Identifier' &&
    expr.object.property.name === 'location' &&
    expr.object.object.type === 'Identifier' &&
    expr.object.object.name === 'window'
  );
}

function isURLsNavigateTo(expr) {
  return (
    expr.type === 'CallExpression' &&
    expr.callee.type === 'MemberExpression' &&
    expr.callee.object.type === 'Identifier' &&
    expr.callee.object.name === 'URLs' &&
    expr.callee.property.type === 'Identifier' &&
    expr.callee.property.name === 'navigateTo'
  );
}

function isTossCoreURLsEnsureCall(expr) {
  return (
    expr.type === 'CallExpression' &&
    expr.callee.type === 'MemberExpression' &&
    expr.callee.object.type === 'Identifier' &&
    expr.callee.object.name === 'TossCoreURLs' &&
    expr.callee.property.type === 'Identifier' &&
    expr.callee.property.name === 'ensure'
  );
}

function isPermittedURL(expr) {
  return isLiteral(expr) || isSupertossCall(expr);
}

function isSupertossCall(expr) {
  return (
    expr.type === 'CallExpression' &&
    expr.callee.type === 'MemberExpression' &&
    expr.callee.object.type === 'Identifier' &&
    expr.callee.object.name === 'Supertoss'
  );
}

function isLiteral(expr) {
  return expr.type === 'Literal';
}

module.exports = {
  meta: {
    schema,
    messages: {
      recommendSafeNavigation:
        '이 URL 이동은 위험할 수 있습니다. TossCoreURLs.navigateTo()을 사용하거나, 토스코어 URL인지 TossCoreURLs.ensure()로 검증하세요.\nhttps://github.toss.bz/toss/frontend-libraries/blob/main/packages/utils/src/TossCoreURLs.md',
    },
  },
  create,
};
