const schema = [
  {
    type: 'object',
    additionalProperties: false,
  },
];

function create(context) {
  return {
    MemberExpression: function (node) {
      if (node.property.name !== 'getInitialProps') {
        return;
      }

      context.report({
        node,
        messageId: 'isGetInitialPropsBanned',
      });
    },
  };
}

module.exports = {
  meta: {
    schema,
    messages: {
      isGetInitialPropsBanned: `getInitialProps 대신 getStaticProps(빌드 타임에 비동기 작업으로 값을 가져올 때), QS.get(쿼리 스트링의 값을 가져올 때), createOpenGraphUrl(동적인 오픈그래프 URL을 만들 때)을 사용해주세요.`,
    },
  },
  create,
};
