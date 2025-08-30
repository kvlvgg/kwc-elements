export function parts(parts: Record<string, boolean> | string[]): string {
  if (Array.isArray(parts)) return parts.join(' ');

  return Object.entries(parts)
    .filter(([_, predicate]) => predicate)
    .map(([part]) => part)
    .join(' ');
}

export function exportparts(parts: Record<string, string> | string[]): string {
  if (Array.isArray(parts)) return parts.join(',');

  return Object.values(parts).join(',');
}
