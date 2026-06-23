/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal

  ### Question

  Replace the `camelCase` or `PascalCase` string with `kebab-case`.

  `FooBarBaz` -> `foo-bar-baz`

  For example

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">
  const foobarbaz: FooBarBaz = "foo-bar-baz"

  type DoNothing = KebabCase<"do-nothing">
  const doNothing: DoNothing = "do-nothing"
  ```

  > View on GitHub: https://tsch.js.org/612
*/

/* _____________ Your Code Here _____________ */
// type KebabCaseCap<S extends string> =  S extends `${infer L extends '-' | '_'}${infer Rest}` 
//   ? `${L}${KebabCaseCap<`${Rest}`>}`
//   : S extends `${infer L}${infer Rest}`
//     ? L extends Uppercase<L> 
//       ? `-${Lowercase<L>}${KebabCaseCap<Rest>}` 
//       : `${L}${KebabCaseCap<`${Rest}`>}`
//     : S
// type KebabCase<S extends string> = KebabCaseCap<Uncapitalize<S>>


  type KebabCase<S extends string> = 
  S extends `${infer Head}${infer Tail}`
    ? `${Lowercase<Head>}${Tail extends Uncapitalize<Tail> ? '' : '-'}${KebabCase<Tail>}`
    : S


type Stv1 = 'a' extends `${infer F}${infer S}` ? S : false 
type Stv2 = 'a' extends `${infer F}${infer S}` ? F : false 
// OR
// type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
//   ? S2 extends Uncapitalize<S2> 
//   ? `${Uncapitalize<S1>}${KebabCase<S2>}`
//   : `${Uncapitalize<S1>}-${KebabCase<S2>}`
//   : S;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/
