export function parts(parts: Record<string, boolean>): string {
  return Object.entries(parts)
    .filter(([_, predicate]) => predicate)
    .map(([part]) => part)
    .join(' ');
}
