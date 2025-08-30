import { newE2EPage } from '@stencil/core/testing';

describe('kwc-date-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kwc-date-picker></kwc-date-picker>');

    const element = await page.find('kwc-date-picker');
    expect(element).toHaveClass('hydrated');
  });
});
