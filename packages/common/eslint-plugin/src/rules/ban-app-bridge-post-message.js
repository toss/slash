const schema = [
  {
    type: 'object',
    additionalProperties: false,
  },
];

function create(context) {
  return {
    MemberExpression: function (node) {
      if (node.object.type !== 'Identifier' || node.object.name !== 'tossAppBridge') {
        return;
      }

      if (node.property.name !== 'postMessage') {
        return;
      }

      context.report({
        node,
        messageId: 'isPostMessageBanned',
      });
    },
  };
}

module.exports = {
  meta: {
    schema,
    messages: {
      isPostMessageBanned: `tossAppBridge.postMessage의 직접 사용을 피해주세요.`,
    },
  },
  create,
};
