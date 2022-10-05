const schema = [
  {
    type: 'object',
    additionalProperties: false,
  },
];

function create(context) {
  return {
    CallExpression: function (node) {
      if (node.callee.name !== 'useQueryParam') {
        return;
      }

      if (node.arguments.length !== 2) {
        return;
      }

      const options = node.arguments[1];

      if (options.type !== 'ObjectExpression') {
        return;
      }

      const option = options.properties.find(x => x.key.name === 'parser');

      if (option == null) {
        return;
      }

      if (option.value.type !== 'Identifier') {
        return;
      }

      if (option.value.name === 'Boolean') {
        context.report({
          node: option.value,
          messageId: 'isUseQueryParamBooleanBanned',
          fix: function (fixer) {
            return fixer.replaceText(option.value, `x => x === 'true'`);
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
      isUseQueryParamBooleanBanned: `parser: Boolean은 문자열 'false'도 true로 반환합니다. parser: x => x === 'true'를 사용해주세요.`,
    },
    fixable: true,
  },
  create,
};
