import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createAST } from '../src'

describe('ast test', () => {
  it('ast', async () => {
    const content = await readFileSync(resolve(__dirname, '../src/mock/add.txt'))
    expect(createAST(content.toString())).toMatchObject({
      type: 'Program',
      body: [
        {
          type: 'statement',
          token: 'add',
        },
        {
          type: 'split',
          token: ' ',
        },
        {
          type: 'value',
          token: '1',
        },
        {
          type: 'split',
          token: ' ',
        },
        {
          type: 'action',
          token: '+',
        },
        {
          type: 'split',
          token: ' ',
        },
        {
          type: 'value',
          token: '1',
        },
        {
          type: 'split',
          token: ' ',
        },
        {
          type: 'equalToken',
          token: '=',
        },
        {
          type: 'split',
          token: ' ',
        },
        {
          type: 'value',
          token: '2',
        },
      ],
    })
  })
})
