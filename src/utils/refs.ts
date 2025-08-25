export function refElements<T extends string>(el: HTMLElement, keys: [T, string][]) {
  const refs: Record<T, HTMLElement> = {} as Record<T, HTMLElement>;

  for (const [key, selector] of keys) {
    refs[key] = el.shadowRoot.querySelector(selector);
  }

  return refs;
}
