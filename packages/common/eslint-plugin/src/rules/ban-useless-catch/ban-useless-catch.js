const schema = [
  {
    type: 'object',
  },
];

function create(context) {
  return {
    CatchClause: function (node) {
      if (!isUselessCatch(node)) {
        return;
      }

      context.report({
        node: node,
        messageId: 'unnecessaryCatch',
      });
      return;
    },
  };
}

function isUselessCatch(node) {
  if (!(node.param && node.param.type === 'Identifier')) {
    return false;
  }

  if (!node.body.body.length || node.body.body.length >= 3) {
    return false;
  }

  if (node.body.body.length === 1) {
    return isThrowingSameError(node.body.body[0], node);
  }

  if (node.body.body.length === 2) {
    return isSentryThrowingSameError(node.body.body[0], node) && isThrowingSameError(node.body.body[1], node);
  }

  return false;
}

function isSentryCaptureExceptionStatement(node) {
  return (
    node.type === 'ExpressionStatement' &&
    node.expression &&
    node.expression.type === 'CallExpression' &&
    node.expression.callee &&
    node.expression.callee.type === 'MemberExpression' &&
    node.expression.callee.object &&
    node.expression.callee.object.type === 'Identifier' &&
    node.expression.callee.object.name === 'Sentry' &&
    node.expression.callee.property &&
    node.expression.callee.property.type === 'Identifier' &&
    node.expression.callee.property.name === 'captureException'
  );
}

function isSentryThrowingSameError(node, root) {
  return (
    isSentryCaptureExceptionStatement(node) &&
    node.expression.arguments &&
    node.expression.arguments.length &&
    node.expression.arguments[0].type === 'Identifier' &&
    node.expression.arguments[0].name === root.param.name
  );
}

function isThrowingSameError(node, root) {
  if (node.type !== 'ThrowStatement') {
    return false;
  }
  if (node.argument && node.argument.type === 'Identifier' && node.argument.name === root.param.name) {
    return true;
  }
  if (
    node.argument &&
    node.argument.type === 'NewExpression' &&
    node.argument.callee &&
    node.argument.callee.type === 'Identifier' &&
    node.argument.callee.name === 'Error' &&
    node.argument.arguments &&
    node.argument.arguments.length &&
    node.argument.arguments[0].type === 'Identifier' &&
    node.argument.arguments[0].name === root.param.name
  ) {
    return true;
  }
  return false;
}

module.exports = {
  meta: {
    schema,
    messages: {
      unnecessaryCatch: '불필요한 catch 구문입니다. 제거해주세요',
    },
  },
  create,
};
