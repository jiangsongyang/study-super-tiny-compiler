import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createAST, transform } from '../src'

describe('ast test', () => {
  it('ast', async () => {
    const content = await readFileSync(resolve(__dirname, '../src/mock/add.txt'))
    expect(transform(createAST(content.toString()))).toMatchObject({
      type: 'Program',
      body: [
        {
          type: 'functionName',
          token: 'add',
        },
        {
          type: 'value',
          token: '1',
        },
        {
          type: 'action',
          token: '+',
        },
        {
          type: 'value',
          token: '1',
        },
      ],
    })
  })
})
