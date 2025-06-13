export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
export function is0xString(value: unknown): value is `0x${string}` {
  return isString(value) && value.startsWith('0x');
}
