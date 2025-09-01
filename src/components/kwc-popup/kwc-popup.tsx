import { Component, Host, h, Prop, Element, Method, State } from '@stencil/core';
import { DOM } from '../../utils/DOM';

import { PARTS } from './constants';

@Component({
  tag: 'kwc-popup',
  styleUrl: 'kwc-popup.css',
  shadow: true,
})
export class KwcPopup {
  @Element() el: HTMLElement;

  @Prop() inline: boolean = false;
  @Prop() offsetY: number = 0;

  @State() visible: boolean = false;

  clickOutSideCallback: (e: MouseEvent) => void = null;

  @Method()
  async isOpen() {
    return this.visible;
  }

  @Method()
  async open(anchorEl: HTMLElement) {
    this.visible = true;
    await new Promise(r => requestAnimationFrame(r));
    DOM.placeElement(this.el, anchorEl, this.offsetY);
  }

  @Method()
  async close() {
    this.visible = false;
    this.removeClickOutsideEvent();
  }

  @Method()
  async adjustWidth(adjustWidthEl: HTMLElement) {
    DOM.adjustWidth(this.el, adjustWidthEl);
  }

  @Method()
  async registerCloseOutside(closeOutsideEl: HTMLElement) {
    this.addClickOutsideEvent(closeOutsideEl);
  }

  addClickOutsideEvent(targetEl: HTMLElement) {
    this.clickOutSideCallback = (e: MouseEvent) => this.onClickOutside(e, targetEl);
    document.addEventListener('click', this.clickOutSideCallback);
  }

  removeClickOutsideEvent() {
    document.removeEventListener('click', this.clickOutSideCallback);
    this.clickOutSideCallback = null;
  }

  onClickOutside(e: MouseEvent, targetEl: HTMLElement) {
    if (DOM.isOutsideClick(e, targetEl)) this.close();
  }

  render() {
    return (
      <Host part={PARTS.POPUP} style={{ '--offset-y': `${this.offsetY}px` }} class={{ popup: !this.inline, hidden: !this.visible }}>
        <slot></slot>
      </Host>
    );
  }
}
