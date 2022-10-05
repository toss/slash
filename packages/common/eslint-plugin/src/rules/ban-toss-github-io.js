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

      const tossGithubIO = 'toss.github.io';
      const staticDocsLink = 'toss.github.io/static_docs';

      if (node.value.includes(staticDocsLink)) {
        context.report({
          node,
          messageId: 'isTossGithubIOStaticDocsBanned',
          fix: function (fixer) {
            return fixer.replaceText(
              node,
              `${node.raw.replace(/toss\.github\.io\/static_docs/g, 'static-docs.toss.im')}`
            );
          },
        });
      } else if (node.value.includes(encodeURIComponent(staticDocsLink))) {
        context.report({
          node,
          messageId: 'isTossGithubIOStaticDocsBanned',
          fix: function (fixer) {
            return fixer.replaceText(
              node,
              `${node.raw.replace(/toss\.github\.io%2Fstatic_docs/g, 'static-docs.toss.im')}`
            );
          },
        });
      } else if (node.value.includes(tossGithubIO) || node.value.includes(encodeURIComponent(tossGithubIO))) {
        context.report({
          node,
          messageId: 'isTossGithubIOBanned',
        });
      }
    },
  };
}

module.exports = {
  meta: {
    schema,
    messages: {
      isTossGithubIOStaticDocsBanned: `toss.github.io/static-docs 가 아니라 static-docs.toss.im 을 사용해주세요.`,
      isTossGithubIOBanned: `toss.github.io를 직접 사용하지 마세요.`,
    },
    fixable: true,
  },
  create,
};
