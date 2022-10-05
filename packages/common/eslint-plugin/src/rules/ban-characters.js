/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const schema = [
  {
    type: 'object',
    properties: {
      bannedCharactersRegex: {
        type: 'string',
      },
      excludeRegex: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
];

function create(context) {
  const { excludeRegex, bannedCharactersRegex } = context.options[0] || {};

  function checkForBannedCharacters(node) {
    const currentFilePath = path.resolve(process.cwd(), context.getFilename());

    if (excludeRegex !== undefined && new RegExp(excludeRegex).test(currentFilePath)) {
      return;
    }

    if (!bannedCharactersRegex) {
      return;
    }

    const sourceCode = context.getSourceCode();
    const tokens = sourceCode.getTokens(node);

    for (const token of tokens) {
      const testerRegex = new RegExp(bannedCharactersRegex, 'g');

      let matches;
      while ((matches = testerRegex.exec(token.value)) != null) {
        const bannedCharacter = matches[0];
        const bannedUnicode = getUnicode(bannedCharacter);

        context.report({
          node,
          line: token.loc.start.line,
          column: token.loc.start.column,
          messageId: 'isCharacterBanned',
          data: {
            bannedCharacter,
            bannedUnicode,
          },
        });
      }
    }
  }

  return {
    Program: checkForBannedCharacters,
  };
}

function getUnicode(str) {
  return str
    .split('')
    .map(x => `\\u${x.charCodeAt(0).toString(16)}`)
    .join('');
}

module.exports = {
  meta: {
    schema,
    messages: {
      isCharacterBanned: `허용되지 않은 문자 \`{{ bannedCharacter }}\`({{ getUnicode(bannedUnicode) }})이 포함되었습니다.`,
    },
  },
  create,
};
