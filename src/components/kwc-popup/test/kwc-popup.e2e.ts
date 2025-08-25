import { newE2EPage } from '@stencil/core/testing';

describe('kwc-popup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kwc-popup></kwc-popup>');

    const element = await page.find('kwc-popup');
    expect(element).toHaveClass('hydrated');
  });
});
