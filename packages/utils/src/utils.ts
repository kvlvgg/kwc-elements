export function format(first?: string, middle?: string, last?: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function toDate(value: Date | string | null): Date | null {
  if (value && typeof value === 'object') return value;
  if (value && typeof value === 'string') return new Date(value);

  return null;
}

export function capitalize(value: string) {
  if (value.length === 0) return value;

  const [first, ...rest] = value;
  return `${first.toUpperCase()}${rest.join('')}`;
}
