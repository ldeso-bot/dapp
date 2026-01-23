export type NumberKeysOf<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {} as Pick<T, K>);
};
