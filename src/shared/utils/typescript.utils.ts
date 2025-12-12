export type NumberKeysOf<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];
