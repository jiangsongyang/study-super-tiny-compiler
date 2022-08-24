import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createAST, gen, transform } from '../src'

describe('gen code test', () => {
  it('gen code', async () => {
    const content = await readFileSync(resolve(__dirname, '../src/mock/add.txt'))
    expect(gen(transform(createAST(content.toString())))).toBe(`const add = () => 1 + 1`)
  })
})
