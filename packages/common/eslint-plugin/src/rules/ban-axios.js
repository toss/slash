const schema = [
  {
    type: 'object',
    additionalProperties: false,
  },
];

/**
 * @tossteam/ban-axios rule은 아래와 같은 axios를 사용하는 import 문을 감지하여 에러를 발생시키는 rule입니다. 대신 @tossteam/ky 를 사용하도록 제시합니다.
 *
 * ```tsx
 * import axios from 'axios';
 * ```
 *
 * @see https://www.notion.so/tossteam/axios-tossteam-ky-d428940c4e02465a9cd3cc65f5dc1f69
 */
function create(context) {
  return {
    ImportDeclaration: function (node) {
      if (node.source.type !== 'Literal' || node.source.value !== 'axios') {
        return;
      }

      context.report({
        node,
        messageId: 'isAxiosBanned',
      });
    },
  };
}

module.exports = {
  meta: {
    schema,
    messages: {
      isAxiosBanned: `axios 대신 @tossteam/ky를 사용해주세요. (https://www.notion.so/tossteam/axios-tossteam-ky-d428940c4e02465a9cd3cc65f5dc1f69)`,
    },
  },
  create,
};
