/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #medium #application

  ### Question

  Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?

  In this challenge, you need to type an object or a class - whatever you like - to provide two function `option(key, value)` and `get()`. In `option`, you can extend the current config type by the given key and value. We should about to access the final result via `get`.

  For example

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // expect the type of result to be:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  You don't need to write any js/ts logic to handle the problem - just in type level.

  You can assume that `key` only accepts `string` and the `value` can be anything - just leave it as-is. Same `key` won't be passed twice.

  > View on GitHub: https://tsch.js.org/12
*/

/* _____________ Your Code Here _____________ */

// type Chainable<ConfigObject = object> = {
//   option<OptionKey extends string, V extends unknown>(key: 
//     OptionKey extends keyof ConfigObject 
//     ? ( V extends ConfigObject[OptionKey] ? never : OptionKey ) 
//     // ? ( ConfigObject[K] extends V ? never : K ) -> NOP
//     : OptionKey, 
//     value: V): Chainable<Omit<ConfigObject, OptionKey> & Record<OptionKey, V>>
//   get(): ConfigObject
// }

// type Chainablev2<R = object> = {
//   option<K extends  string, V>(key: K extends keyof R ? never : K, value: V): Chainable<Omit<R, K> & Record<K, V>>
//   get(): R
// }


type Chainable<Obj = {}> = {
  get: () => Obj
  option: <K extends string, V extends unknown>(key: K extends keyof Obj ? never : K, value: V) => Chainable<Omit<Obj,K> & {[OnlyKey in K]: V}>
}

// type Chainable<T = {}> = {
//   option: <K extends string, V>(key: K extends keyof T ?
//     V extends T[K] ? never : K
//     : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
//   get: () => T
// }


const myTest = a
  .option('foo', 123)
  .option('thing', {a: 3, isDev: true})
  //@ts-expect-error
  .option('foo', 'as')
  .get()






/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/12/answer
  > View solutions: https://tsch.js.org/12/solutions
  > More Challenges: https://tsch.js.org
*/
