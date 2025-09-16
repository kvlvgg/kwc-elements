export const DOM = {
  viewport: {},

  isOutsideClick(e: MouseEvent, el: HTMLElement) {
    let targetEl = e.target as HTMLElement;

    while (targetEl && targetEl !== el) targetEl = targetEl.parentElement;
    if (targetEl) return false;

    return true;
  },

  placeElement(targetEl: HTMLElement, relativeEl: HTMLElement, offsetY: number = 0) {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const documentScrollTop = document.documentElement.scrollTop;

    const { width: popupWidth, height: popupHeight } = targetEl.getBoundingClientRect();
    const { width: inputWidth, height: inputHeight, x: inputX, y: inputY } = relativeEl.getBoundingClientRect();

    if (inputY + inputHeight + popupHeight > viewportHeight) targetEl.style.top = `-${popupHeight + offsetY}px`;
    else targetEl.style.top = `${inputHeight + offsetY}px`;

    if (targetEl.getBoundingClientRect().y + documentScrollTop < 0) targetEl.style.top = `${inputHeight + offsetY}px`;

    if (inputX + popupWidth > viewportWidth) targetEl.style.left = `-${popupWidth - inputWidth}px`;
    else targetEl.style.left = `0`;
  },

  adjustWidth(targetEl: HTMLElement, relativeEl: HTMLElement) {
    const { width } = relativeEl.getBoundingClientRect();
    targetEl.style.width = `${width}px`;
  },
};
