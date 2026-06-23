/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.

  For example

  ```ts
  type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```

  > View on GitHub: https://tsch.js.org/108
*/

/* _____________ Your Code Here _____________ */

type BlankSpace = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${BlankSpace}${infer Content}` ? TrimLeft<Content> : S 
type TrimRight<S extends string> = S extends `${infer Content}${BlankSpace}` ? TrimRight<Content> : S 

type Trim<S extends string> =
  S extends `${BlankSpace}${infer Content}`
   ?  Trim<Content> 
   :  S extends `${infer Content}${BlankSpace}`
      ? Trim<Content>
      : S

// type Trim<S extends string> = S extends `${BlankSpace}${infer R}` | `${infer R}${BlankSpace}` ? Trim<R> : S;
type TrimAlt<S extends string> = TrimRight<TrimLeft<S>>;
type Test = TrimAlt<'  str    '>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

export {}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/108/answer
  > View solutions: https://tsch.js.org/108/solutions
  > More Challenges: https://tsch.js.org
*/
