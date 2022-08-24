import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Ts2Js } from '../src'

describe('super tiny compiler', () => {
  it('happy path', async () => {
    const content = await readFileSync(resolve(__dirname, '../src/mock/add.txt'))

    expect(Ts2Js(content.toString())).toBe(`const add = () => 1 + 1`)
  })
})
