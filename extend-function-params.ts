// https://stackoverflow.com/questions/60323726/typescript-add-one-argument-to-a-functions-params

// The epic Generic solution

type SomeFunc = (a: string, b: number, c: string) => number;

// some utility types for working with tuples
type Cons<H, T extends readonly any[]> =
    ((head: H, ...tail: T) => void) extends ((...cons: infer R) => void) ? R : never;

type Push<T extends readonly any[], V>
    = T extends any ? Cons<void, T> extends infer U ?
    { [K in keyof U]: K extends keyof T ? T[K] : V } : never : never;

// final type you need
type AddArgument<F, Arg> = 
F extends ((...args: infer PrevArgs) => infer R) 
? (...args: Push<PrevArgs, Arg>) => R : never

// function type with added boolean argument at the end
type NewFunction = AddArgument<SomeFunc, boolean>

// A less Generic solution

type FuncBaseArgs = {
  a: string;
  b: number;
  c: boolean;
}

type SomeFunc = ({...obj }: FuncBaseArgs) => number;

type SomeFuncAltered = ({...obj }: FuncBaseArgs, d: number) => number;
