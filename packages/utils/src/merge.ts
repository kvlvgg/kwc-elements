export function merge<T extends Record<string, unknown>>(value: Partial<T>, defaultValue: Partial<T>): T {
  if (!value) return defaultValue as T;

  for (const prop in defaultValue) {
    if (!(prop in value)) {
      value[prop] = defaultValue[prop];
    } else if (typeof defaultValue[prop] === 'object') {
      merge(value[prop] as (typeof value)[typeof prop] & object, defaultValue[prop]);
    }
  }

  return value as T;
}
