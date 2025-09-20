import { newSpecPage } from '@stencil/core/testing';
import { KwcInputGroup } from '../kwc-input-group';

describe('kwc-input-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KwcInputGroup],
      html: `<kwc-input-group></kwc-input-group>`,
    });
    expect(page.root).toEqualHtml(`
      <kwc-input-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kwc-input-group>
    `);
  });
});
