/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys #deep

  ### Question

  Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.

  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

  For example:

  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/9
*/

/* _____________ Your Code Here _____________ */

type DeepReadonly<T> = {
  readonly [K in keyof T] : keyof T[K] extends never ?  T[K] : DeepReadonly<T[K]>   
}
type BadDeepReadonly<T> = {
  readonly [K in keyof T] : T[K] extends Record<string, any> ?  DeepReadonly<T[K]> : T[K]   
}

type My4 = BadDeepReadonly<() => 22>

type MyType =  [
        'hi',
        {
          m: ['hey']
        },
]

type My1 = DeepReadonly<MyType>
function Myf() {
  return true
}


class MyClass {}      
type C1 = (() => 22) extends Record<string, any> ? true : false        // true
type C5 = [] extends Record<string, any> ? true : false                // true
type C7 = { a: 1 } extends Record<string, any> ? true : false          // true
type C6 = [1, 2, 3] extends Record<string, any> ? true : false         // true
type C10 = MyClass extends Record<string, any> ? true : false           // true
type C2 = string extends Record<string, any> ? true : false            // false
type C3 = number extends Record<string, any> ? true : false            // false
type C4 = boolean extends Record<string, any> ? true : false           // false
type C8 = null extends Record<string, any> ? true : false              // false
type C9 = undefined extends Record<string, any> ? true : false         // false


type A = keyof (() => void)  // never (en mapped types)
type B = keyof symbol        // never (en mapped types)
type C = keyof unknown // never
type D = keyof any     // string | number | symbol  ← NO es never
type E = keyof {}      // never  ← SÍ es never
type F = keyof object  // never  ← SÍ es never (sorprendente)


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
  Expect<Equal<DeepReadonly<X3>, Expected3>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
type Expected2 = { readonly a: string } | { readonly b: number }


type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}
type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type X3 = {
  a: () => 22
  // b: string
  // c: {
  //   d: boolean
  //   e: {
  //     g: {
  //       h: {
  //         i: true
  //         j: 'string'
  //       }
  //       k: 'hello'
  //     }
  //   }
  // }
}
type Expected3 = {
  readonly a: () => 22
  // readonly b: string
  // readonly c: {
  //   readonly d: boolean
  //   readonly e: {
  //     readonly g: {
  //       readonly h: {
  //         readonly i: true
  //         readonly j: 'string'
  //       }
  //       readonly k: 'hello'
  //     }
  //   }
  // }
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9/answer
  > View solutions: https://tsch.js.org/9/solutions
  > More Challenges: https://tsch.js.org
*/
