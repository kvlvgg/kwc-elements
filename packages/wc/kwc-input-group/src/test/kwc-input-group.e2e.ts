import { newE2EPage } from '@stencil/core/testing';

describe('kwc-input-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kwc-input-group></kwc-input-group>');

    const element = await page.find('kwc-input-group');
    expect(element).toHaveClass('hydrated');
  });
});
