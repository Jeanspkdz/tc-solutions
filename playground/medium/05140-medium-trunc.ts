/*
  5140 - Trunc
  -------
  by jiangshan (@jiangshanmeta) #medium #template-literal

  ### Question

  Implement the type version of ```Math.trunc```, which takes string or number and returns the integer part of a number by removing any fractional digits.

  For example:

  ```typescript
  type A = Trunc<12.34> // 12
  ```

  > View on GitHub: https://tsch.js.org/5140
*/

/* _____________ Your Code Here _____________ */
// THIS doesn't pass all the test cases.
// type Trunc<V extends number | string, RawV = V extends string ? V : `${V}`> =
//   RawV extends `${infer FC}${infer Rest}` 
//   ? FC extends '.' 
//     ? ''
//     : `${FC}${Trunc<Rest>}`
//   : ''

type Trunc<
  V extends number | string, 
  Acc extends string = ''  ,
  RawV = V extends string ? V : `${V}`
> =
  RawV extends `${infer FC}${infer Rest}` 
  ? FC extends '.' 
    ? Acc extends '' | '-' 
      ? `${Acc}0`
      : Acc
    : Trunc<Rest, `${Acc}${FC}`>
  : Acc


type NumToStr<T extends number> = `${T}`
type Test = NumToStr<12.345>
type Test2 = NumToStr<-12.345>
type A = 12.345
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'-.3'>, '-0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5140/answer
  > View solutions: https://tsch.js.org/5140/solutions
  > More Challenges: https://tsch.js.org
*/
