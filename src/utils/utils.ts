export function format(first?: string, middle?: string, last?: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function toDate(value: Date | string | null): Date | null {
  if (value && typeof value === 'object') return value;
  if (value && typeof value === 'string') return new Date(value);

  return null;
}
