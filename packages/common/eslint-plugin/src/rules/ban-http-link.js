const schema = [
  {
    type: 'object',
    additionalProperties: false,
  },
];

function create(context) {
  return {
    Literal: function (node) {
      if (typeof node.value !== 'string') {
        return;
      }

      // eslint-disable-next-line @tossteam/ban-http-link
      if (node.value.indexOf('http://') >= 0) {
        context.report({
          node,
          messageId: 'isHttpBanned',
          fix: function (fixer) {
            return fixer.replaceText(node, `${node.raw.replace(/http:\/\//, 'https://')}`);
          },
        });
      }
    },
  };
}

module.exports = {
  meta: {
    schema,
    messages: {
      isHttpBanned: `HTTP 링크가 포함되었습니다. 토스 앱에서는 HTTPS 링크만 사용할 수 있습니다.`,
    },
    fixable: true,
  },
  create,
};
