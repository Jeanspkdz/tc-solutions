/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */

type Flatten<A extends Array<unknown>> = A extends [infer El, ...infer Rest] ? 
  El extends unknown[] 
    ? [...Flatten<El>, ...Flatten<Rest>]
    : [El, ...Flatten<Rest>]
  : []


type FlattenDepth<A extends unknown[], Depth extends number = 1> =  
 Depth extends 0 
    ? A
    : A extends [infer El, ...infer Rest]
      ? El extends unknown[] 
        ? [
            ...FlattenDepth<El, MinusOne<Depth>>,
            ...FlattenDepth<Rest, Depth>
          ]
        : [El, ...FlattenDepth<Rest, Depth>]
      : A

// OR
// type FlattenDepth<
//   T extends any[],
//   S extends number = 1,
//   U extends any[] = []
// > = U['length'] extends S
//   ? T
//   : T extends [infer F, ...infer R]
//   ? F extends any[]
//     ? [...FlattenDepth<F, S, [...U, 1]>, ...FlattenDepth<R, S, U>]
//     : [F, ...FlattenDepth<R, S, U>]
//   : T



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { MinusOne } from './02257-medium-minusone'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
