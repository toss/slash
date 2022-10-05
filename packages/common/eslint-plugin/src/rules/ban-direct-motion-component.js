function create(context) {
  const sourceCode = context.getSourceCode();

  return {
    ImportDeclaration: function (node) {
      if (node.source.type !== 'Literal') {
        return;
      }

      if (node.source.value !== 'framer-motion') {
        return;
      }

      const motionImport = node.specifiers.find(specifier => {
        return specifier.type === 'ImportSpecifier' && specifier.imported.name === 'motion';
      });

      if (motionImport == null) {
        return;
      }

      context.report({
        node,
        messageId: 'isDirectMotionComponentImportBanned',
        fix: function* (fixer) {
          if (node.specifiers.length === 1) {
            yield fixer.remove(node);
          } else {
            const trailing = sourceCode.getTokenAfter(motionImport);

            yield fixer.remove(motionImport);

            if (isCommaPunctuator(trailing)) {
              yield fixer.remove(trailing);
            }
          }

          yield fixer.insertTextAfter(node, `\nimport { motion } from '@tossteam/framer-motion';`);
        },
      });
    },
  };
}

function isCommaPunctuator(node) {
  return node.type === 'Punctuator' && node.value === ',';
}

module.exports = {
  meta: {
    messages: {
      isDirectMotionComponentImportBanned: `@tossteam/framer-motion의 motion 컴포넌트를 사용해주세요. framer-motion의 motion 컴포넌트는 오래된 브라우저(IE) 지원이 되지 않습니다.`,
    },
    fixable: true,
  },
  create,
};
