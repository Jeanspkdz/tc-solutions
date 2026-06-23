/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Expand<T> = { [K in keyof T]: T[K]} 
type Diff<O extends object, O1 extends object> = Expand<Omit<O, keyof O1> & Omit<O1, keyof O>>
// OR
// type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>

// OR
// type Diff<O, O1> = {
//   [K in keyof (O & O1) as K extends keyof (O | O1) ? never : K]: (O & O1)[K];
// };

type UA = 'a' | 'b' | 'c'
type UB =  'b' | 'c' | 'd' 
type JustInter = UA & UB
type JustUnion = UA | UB
type WithInter = keyof (Foo & Bar)
type WithUnion = keyof (Foo | Bar)

type Inter = Foo & Bar
type Union = Foo | Bar
const a : Inter = {gender: 2, age: '', name: ''}
const b : Union = {gender: 2, age: '', name: ''}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
