/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer, defineStencilSSRComponent, type StencilVueComponent } from '@stencil/vue-output-target/runtime';

import type { JSX } from '@kwc-elements/calendar/components';

import { defineCustomElement as defineKwcCalendar } from '@kwc-elements/calendar/components/kwc-calendar.js';


export const KwcCalendar: StencilVueComponent<JSX.KwcCalendar> = /*@__PURE__*/ globalThis.window ? defineContainer<JSX.KwcCalendar>('kwc-calendar', defineKwcCalendar, [
  'value',
  'locale',
  'valueChanged'
], [
  'valueChanged'
]) : defineStencilSSRComponent<JSX.KwcCalendar>({
  tagName: 'kwc-calendar',
  hydrateModule: import('@kwc-elements/calendar/hydrate'),
  props: {
    'value': [String, "value"],
    'locale': [String, "locale"],
    'onValueChanged': [Function]
  }
});

