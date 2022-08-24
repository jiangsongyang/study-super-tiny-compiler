/*
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2',
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4',
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2',
 *         }]
 *       }]
 *     }]
 *   }
 */

export const createAST = (content: string) => {
  const AST: any = {
    type: 'Program',
    body: [],
  }

  let pointer = 0

  const stopToken = ' '

  const parseContent = (content: string) => {
    const stack: string[] = []
    while (pointer <= content.length) {
      const token = content[pointer]

      if (!token || token === stopToken) {
        // 可以生成一个 token 了
        const tokenStr = stack.join('')

        let type: string = ''

        switch (tokenStr) {
          case 'add':
            type = 'statement'
            break
          case '+':
            type = 'action'
            break
          case '=':
            type = 'equalToken'
            break
          default:
            type = 'value'
            break
        }

        AST.body.push({
          type,
          token: tokenStr,
        })
        if (token)
          AST.body.push({
            type: 'split',
            token: ' ',
          })

        stack.length = 0
      } else {
        stack.push(token)
      }

      pointer++
    }
  }

  parseContent(content)

  return AST
}

export const transform = (ast: any) => {
  const AST = {
    type: 'Program',
    body: [],
  }
  return AST
}

export const gen = (ast: any) => {
  return `const a = '123'`
}

export const Ts2Js = (content: string) => {
  const ast = createAST(content)
  transform(ast)
  const res = gen(ast)
  return res
}
