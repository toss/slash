/* eslint-disable @typescript-eslint/no-var-requires */
const { isInsideComponent } = require('../../utils');

const schema = [
  {
    type: 'object',
  },
];

function create(context, checkOnlyComponentOrHook) {
  return {
    CatchClause: function (node) {
      if (checkOnlyComponentOrHook !== isInsideComponent(node)) {
        return;
      }

      if (!isSentryOnlyCatch(node)) {
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

/** @description try { throwable(); } catch (e) { Sentry.captureException(e); } */
function isSentryOnlyCatch(node) {
  if (node.body.body.length !== 1) {
    return false;
  }

  return isSentryThrowingSameError(node.body.body[0], node);
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

module.exports = {
  insideComponent: {
    meta: {
      schema,
      messages: {
        unnecessaryCatch: '불필요한 catch 구문입니다. 제거해주세요',
      },
    },
    create: context => create(context, true),
  },
  outsideComponent: {
    meta: {
      schema,
      messages: {
        unnecessaryCatch: '불필요한 catch 구문인지 확인해주세요.',
      },
    },
    create: context => create(context, false),
  },
};
