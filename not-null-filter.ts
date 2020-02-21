// https://stackoverflow.com/questions/60329114/how-to-tell-typescript-that-lodash-filter-makes-something-non-null

declare const users: {id: number, name: string | null}[];
const notNull = <K extends string>(key: K) =>
    <T extends { [k in K]: T[K] }>(val: T): val is T & { [k in K]: Exclude<T[K], null> } =>
        val[key] !== null;

const lowerCaseNames = _(users)
  .filter(notNull('name'))
  .map(user => user.name.toLowerCase())
  .value();
