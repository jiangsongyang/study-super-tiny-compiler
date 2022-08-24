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

type ASTNode = {
  type: string
  token: string
}

type AST = {
  type: 'Program'
  body: ASTNode[]
}

const splitToken = ' '

export const createAST = (content: string) => {
  const AST: AST = {
    type: 'Program',
    body: [],
  }

  let pointer = 0

  const parseContent = (content: string) => {
    const stack: string[] = []
    while (pointer <= content.length) {
      const token = content[pointer]

      if (!token || token === splitToken) {
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

export const transform = (ast: AST) => {
  // 删除 splitToken
  ast.body = ast.body
    .map(i => {
      if (i.type === 'split') {
        return undefined
      } else {
        return i
      }
    })
    .filter(Boolean) as ASTNode[]

  // 重命名
  ast.body = ast.body.map(i => {
    if (i.type === 'statement') {
      return {
        ...i,
        type: 'functionName',
      }
    }
    return i
  })

  return ast
}

export const gen = (ast: AST) => {
  let base = `const fn = () => `

  ast.body.forEach(i => {
    if (i.type === 'functionName') {
      base = base.replace(/fn/, i.token)
    }
    if (['value', 'action'].includes(i.type)) {
      base += `${i.token} `
    }
  })

  return base.slice(0, -1)
}

export const Ts2Js = (content: string) => {
  const ast = createAST(content)
  transform(ast)
  const res = gen(ast)
  return res
}
