/*
  949 - AnyOf
  -------
  by null (@kynefuk) #medium #array

  ### Question

  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.

  For example:

  ```ts
  type Sample1 = AnyOf<[1, "", false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, "", false, [], {}]> // expected to be false.
  ```

  > View on GitHub: https://tsch.js.org/949
*/

/* _____________ Your Code Here _____________ */
type NoKeys = keyof {} // never
type NeverObj = Record<never, never> // {}
type EmptyObj = Record<PropertyKey, never>
type Equivalent = Record<never, never> extends {} ? true : false
type JustTestA = {a: boolean} extends NeverObj ? true : false
type JustTestB = {a: boolean} extends {} ? true : false

type MyTestv3 =  1 extends NeverObj ? true : false

type IsEmptyObject<O extends object> = keyof O extends never ? true : false
type JustTruthyValues<T extends readonly any[]> = {
  [K in keyof T & `${number}` as T[K] extends 0 | undefined | '' | null | false | [] | Record<string, never> 
    ? never
      : K] : T[K] 
}
type AnyOf<T extends readonly any[]> = IsEmptyObject<JustTruthyValues<T>> extends true ? false : true
//OR 
// type AnyOf<T extends any[]> = T[number] extends
//  0 | '' | false | [] | {[key: string]: never} | null | undefined 
//  ? false 
//  : true;

type MyTest = JustTruthyValues<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>
type MyTestv2 = JustTruthyValues<[0, '', false, [], {}]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/949/answer
  > View solutions: https://tsch.js.org/949/solutions
  > More Challenges: https://tsch.js.org
*/
