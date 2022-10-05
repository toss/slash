const {
  isHook,
  getFunctionName,
  isInsideComponentOrHook,
  isMemoCallback,
  isForwardRefCallback,
  isComponentName,
} = require('../../utils');

module.exports = {
  create(context) {
    const option = context.options[0] || { methods: [] };

    const methods = option.methods.map(({ method, alternate }) => {
      if (method.includes('.')) {
        const [member, name] = method.split('.');
        return {
          member,
          name,
          alternate,
        };
      }

      return {
        name: method,
        alternate,
      };
    });

    return {
      onCodePathEnd(codePath, codePathNode) {
        const codePathFunctionName = getFunctionName(codePathNode);

        const isSomewhereInsideComponentOrHook = isInsideComponentOrHook(codePathNode);
        const isDirectlyInsideComponentOrHook = codePathFunctionName
          ? isComponentName(codePathFunctionName) || isHook(codePathFunctionName)
          : isForwardRefCallback(codePathNode) || isMemoCallback(codePathNode);

        if (!isSomewhereInsideComponentOrHook || !isDirectlyInsideComponentOrHook) {
          return;
        }

        // 무슨케이스인지 보기
        if (codePathNode.body.type !== 'BlockStatement') {
          return;
        }

        /**
         * function Foo() {
         *   // 이부분
         * }
         */
        const block = codePathNode.body;

        function getUsedBannedMethod(callee) {
          if (callee.type === 'Identifier') {
            return methods.find(method => !method.member && method.name === callee.name);
          }

          if (callee.type === 'MemberExpression') {
            return methods.find(method => method.member === callee.object.name && method.name === callee.property.name);
          }
          return null;
        }

        block.body.forEach(node => {
          /**
           * function Foo() {
           *  const bar = // 이부분
           * }
           */
          if (node.type === 'VariableDeclaration') {
            node.declarations.forEach(declaration => {
              if (!declaration.init || declaration.init.type !== 'CallExpression') {
                return;
              }

              /**
               * 아래코드에서 Member.foo 부분
               * function Foo() {
               *   const bar = Member.foo()
               * }
               */
              // if (callee.type === 'MemberExpression' && callee.object.type === 'Identifier') {
              //   if (callee.object.name === 'QS') {
              //   }
              // }
              const callee = declaration.init.callee;
              const usedBannedMethod = getUsedBannedMethod(callee);
              if (usedBannedMethod) {
                const methodName = usedBannedMethod.member
                  ? `${usedBannedMethod.member}.${usedBannedMethod.name}`
                  : usedBannedMethod.name;
                context.report({
                  node: callee,
                  message: `${methodName}은 SSR 안전하지 않습니다.${
                    usedBannedMethod.alternate ? ` 대신 ${usedBannedMethod.alternate}를 사용해주세요.` : ''
                  }`,
                });
              }
            });
          }
        });
      },
    };
  },
};
