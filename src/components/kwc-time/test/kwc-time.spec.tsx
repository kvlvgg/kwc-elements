import { newSpecPage } from '@stencil/core/testing';
import { KwcTime } from '../kwc-time';

describe('kwc-time', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KwcTime],
      html: `<kwc-time></kwc-time>`,
    });
    expect(page.root).toEqualHtml(`
      <kwc-time>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kwc-time>
    `);
  });
});
