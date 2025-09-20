import { newE2EPage } from '@stencil/core/testing';

describe('kwc-time', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kwc-time></kwc-time>');

    const element = await page.find('kwc-time');
    expect(element).toHaveClass('hydrated');
  });
});
