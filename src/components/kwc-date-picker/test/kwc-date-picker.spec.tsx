import { newSpecPage } from '@stencil/core/testing';
import { KwcDatePicker } from '../kwc-date-picker';

describe('kwc-date-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KwcDatePicker],
      html: `<kwc-date-picker></kwc-date-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <kwc-date-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kwc-date-picker>
    `);
  });
});
