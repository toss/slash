const schema = [
  {
    type: 'object',
    additionalProperties: false,
  },
];

function create(context) {
  return {
    ImportDeclaration: function (node) {
      if (node.source.type !== 'Literal') {
        return;
      }

      if (node.source.value !== 'lodash' && !node.source.value.startsWith('lodash/')) {
        return;
      }

      context.report({
        node,
        messageId: 'isLodashBanned',
      });
    },
  };
}

module.exports = {
  meta: {
    schema,
    messages: {
      isLodashBanned: `'lodash' 대신 @tossteam/utils의 대체 함수를 사용해주세요. 꼭 필요하다면 lodash.throttle 과 같이 별도로 lodash.xx 패키지를 설치 후 사용해주세요.`,
    },
  },
  create,
};
