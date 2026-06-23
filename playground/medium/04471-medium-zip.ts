/*
  4471 - Zip
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
  ```ts
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
  ```

  > View on GitHub: https://tsch.js.org/4471
*/

/* _____________ Your Code Here _____________ */

type Zipv2<T extends any[], U extends any[]> =
[T, U] extends [
  [infer L, ...infer RestT],
  [infer R, ...infer RestU]
]
? [[L, R], ...Zip<RestT, RestU>]
: []

// OR

type Zip<
  T extends readonly unknown[] = [],
  U extends readonly unknown[] = [], 
  LowerTuple = GetLowerTuple<T, U>
> = {
  [K in keyof LowerTuple]: 
      K extends keyof T 
        ? K extends keyof U 
          ? [T[K], U[K]]
          : never
        : never

}

type GetCommonTupleKeys<
  T extends readonly unknown[] = [],
  U extends readonly unknown[] = []
> = (keyof(T | U)) & `${number}` 

type GetLowerTuple<
  T extends readonly unknown[] = [],
  U extends readonly unknown[] = []
> = 
  T['length'] extends U['length'] 
  ? U
  : T[U['length']] extends number 
    ? U
    : T

type CommonTupleTest = GetCommonTupleKeys<[2,true], ['s', 'c', 2]>
type GetLowerTupleTest = GetLowerTuple<[2,true], ['s', 'c', 2]>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4471/answer
  > View solutions: https://tsch.js.org/4471/solutions
  > More Challenges: https://tsch.js.org
*/
