import { Component, Host, h, Prop } from '@stencil/core';

import { PARTS } from './constants';

@Component({
  tag: 'kwc-input-group',
  styleUrl: 'kwc-input-group.css',
  shadow: true,
})
export class KwcInputGroup {
  @Prop() value: string = null;

  render() {
    return (
      <Host part={PARTS.INPUT_WRAPPER}>
        <input part={PARTS.INPUT} class="input" value={this.value} />

        <div part={PARTS.ICONS_WRAPPER}>
          <slot name="icons"></slot>
        </div>
      </Host>
    );
  }
}
