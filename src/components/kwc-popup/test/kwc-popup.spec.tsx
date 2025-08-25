import { newSpecPage } from '@stencil/core/testing';
import { KwcPopup } from '../kwc-popup';

describe('kwc-popup', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KwcPopup],
      html: `<kwc-popup></kwc-popup>`,
    });
    expect(page.root).toEqualHtml(`
      <kwc-popup>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kwc-popup>
    `);
  });
});
