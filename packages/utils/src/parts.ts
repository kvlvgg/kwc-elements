export function parts(parts: Record<string, boolean> | readonly string[]): string {
  if (Array.isArray(parts)) return parts.join(' ');

  return Object.entries(parts)
    .filter(([_, predicate]) => predicate)
    .map(([part]) => part)
    .join(' ');
}

export function exportparts(parts: Record<string, string | readonly string[]> | readonly string[]): string {
  if (Array.isArray(parts)) return parts.flatMap(x => x).join(',');

  return Object.values(parts)
    .flatMap(x => x)
    .join(',');
}
