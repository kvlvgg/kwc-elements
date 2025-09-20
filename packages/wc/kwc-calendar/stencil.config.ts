import { Config } from '@stencil/core';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'kwc-calendar',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'dist-hydrate-script',
      dir: './hydrate',
    },
    vueOutputTarget({
      includeImportCustomElements: true,
      includePolyfills: false,
      includeDefineCustomElements: false,
      componentCorePackage: '@kwc-elements/calendar',
      hydrateModule: '@kwc-elements/calendar/hydrate',
      proxiesFile: '../../vue/kwc-calendar/src/index.ts',
      customElementsDir: 'components',
    }),
  ],
  testing: {
    browserHeadless: 'shell',
  },
};
