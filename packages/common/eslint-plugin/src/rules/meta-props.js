const correctProperties = ['logger', 'loggerParams', 'openGraph'];

function create(context) {
  function checkForMetaProps(assignmentExpression) {
    const { left, right, operator } = assignmentExpression;

    if (left.type !== 'MemberExpression') {
      return;
    }

    if (left.property.name !== 'metaProps') {
      return;
    }

    if (operator !== '=') {
      context.report({
        node: assignmentExpression,
        messageId: 'useEqualOperator',
      });
      return;
    }

    if (right.type !== 'ObjectExpression') {
      context.report({
        node: right,
        messageId: 'useObjectExpression',
      });
      return;
    }

    for (const property of right.properties) {
      if (property.key.type !== 'Identifier' || property.computed) {
        context.report({
          node: property.key,
          messageId: 'useStringLiteralProperty',
        });
        continue;
      }

      if (!correctProperties.includes(property.key.name)) {
        context.report({
          node: property.key,
          messageId: 'invalidPropertyName',
        });
        continue;
      }
    }
  }

  return {
    AssignmentExpression: checkForMetaProps,
  };
}

module.exports = {
  meta: {
    schema: [],
    messages: {
      useEqualOperator: 'metaProps에 할당할 때에는 연산자 `=`를 사용해주세요.',
      useObjectExpression: 'metaProps에는 객체만 할당할 수 있습니다.',
      useStringLiteralProperty: 'metaProps에는 문자열 리터럴로 이루어진 프로퍼티만 사용할 수 있습니다.',
      invalidPropertyName: `metaProps의 프로퍼티로는 ${correctProperties.join(', ')}만 사용할 수 있습니다.`,
    },
  },
  create,
};
