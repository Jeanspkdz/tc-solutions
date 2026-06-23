/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

// type GreaterThan<T extends number, U extends number> = CompareTuples<FillTuple<T>, FillTuple<U>> // it fail when the numbers are too high

// FIRST COMPARE THE LENGTH -> AND DEPENDING ON THE LENGTH CALCULATE WHICH ONE IS GREATER 
// IF THEY HAVE EQUAL LENGTHS -> COMPARE DIGIT BY DIGIT
type GreaterThan<T extends number, U extends number> = 
CompareTuplesRaw<
  FillTuple<GetStringLength<ParseString<T>>>,
  FillTuple<GetStringLength<ParseString<U>>>
> extends infer Result 
    ? Result extends 'equal'
     ? CompareEqualLength<ParseString<T>, ParseString<U>>
     :  Result extends 'greater'
        ? true
        : false
   : never


type ParseInt<N extends string> = N extends `${infer V extends number}` ? V : never 
type ParseString<N extends number> = `${N}` 

type ExtractNumbers<N extends string, Acc extends string = ''> =
  N extends `${infer V extends number}${infer Rest}`
  ? ExtractNumbers<Rest, `${Acc}${V}`>
  : N extends `${infer L}${infer Rest}`
    ? ExtractNumbers<Rest, `${Acc}`>
    : ParseInt<Acc>

type GetStringLength<S extends string, Tup extends readonly string[] = []> = 
  S extends `${infer L}${infer Rest}`
    ? GetStringLength<Rest, [...Tup, L]>
    : Tup['length']

type CompareEqualLength<
  A extends string,
  B extends string, 
  > =
  A extends `${infer LA}${infer RestA}`
  ? B extends `${infer LB}${infer RestB}`
    ? CompareTuplesRaw<
        FillTuple<ParseInt<LA>>,
        FillTuple<ParseInt<LB>>
      > extends 'equal' 
      ? CompareEqualLength<RestA, RestB>
      : CompareTuplesRaw<
        FillTuple<ParseInt<LA>>,
        FillTuple<ParseInt<LB>>
      > extends 'greater'
        ? true 
        : false
    : false  
  : false

type FillTuple<Length extends number, Acc extends number[] = []> = Acc['length'] extends Length 
? Acc
: FillTuple<Length, [...Acc, 1]> 

type CompareTuples<A extends readonly number[] = [],B extends readonly number[] = []>  = 
A['length'] extends B['length']
? false
: B[A['length']] extends number 
? false
: true

type CompareTuplesRaw<A extends readonly number[] = [],B extends readonly number[] = []>  = 
A['length'] extends B['length']
? 'equal'
: B[A['length']] extends number 
? 'less' // B is greater 
: 'greater' // A is greater
    
    
    
type Test = FillTuple<2>
type TestParseInt = ParseInt<'234'>
type TestParseString = ParseString<234>
    
type ExtractNumbersTest = ExtractNumbers<'b2as1'>
type ComEqLeTest = CompareEqualLength<'101', '100'>
type PrsStrTest = ParseString<92345678910119>
type GetStrLengthTest = GetStringLength<"923">

type Testv2 = CompareTuples<[1,2,3], [1,2,3]>
type Testv3 = CompareTuples<[1,2,3, 4], [1]>
type Testv4 = CompareTuples<[1,2,3,4], [1,2,3,4,5]>
type Testv5 = CompareTuples<[], []>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
