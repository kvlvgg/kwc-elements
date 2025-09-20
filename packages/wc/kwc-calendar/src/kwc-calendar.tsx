import { Component, h, Host, State, Prop, Element, Event, EventEmitter, Watch } from '@stencil/core';
import { toDate } from '@kwc-elements/utils';
import { parts } from '@kwc-elements/utils';

import { KwcDate } from '@kwc-elements/utils/date';
import { KwcDateLocalization } from '@kwc-elements/utils/date';

import type { KwcCalendarValueChanged } from '@kwc-elements/utils/date';

import { PARTS } from './constants';

import type { ViewMode } from './types';
import { views } from './views';

@Component({
  tag: 'kwc-calendar',
  styleUrl: 'kwc-calendar.css',
  shadow: true,
})
export class KwcCalendar {
  @Element() el: HTMLElement;

  @Prop() value: Date | string | null = null;
  @Prop() locale: string | null = null;

  @State() current: KwcDate = KwcDate.now();
  @State() selected: KwcDate = KwcDate.now();
  @State() viewState: KwcDate = KwcDate.now();

  @Event() valueChanged: EventEmitter<KwcCalendarValueChanged>;

  localization!: KwcDateLocalization;

  componentWillLoad() {
    this.localization = new KwcDateLocalization(this.locale);
    this.onValueChanged(this.value);
    this.valueChanged.emit({
      localization: this.localization,
      kwcDate: this.selected,
      date: this.selected.toDate(),
    });
  }

  @Watch('value')
  onValueChanged(value: Date | string | null) {
    value = toDate(value ?? this.current.toDate());

    this.selected = new KwcDate(value);
    this.viewState = new KwcDate(value);
  }

  get viewDiff() {
    const diff = { years: 0, months: 0 };

    if (this.view === 'month') diff.months = 1;
    if (this.view === 'year') diff.years = 1;
    if (this.view === 'decade') diff.years = 10;

    return diff;
  }

  moveToPrev() {
    this.viewState = this.viewState.substract(this.viewDiff);
  }

  moveToNext() {
    this.viewState = this.viewState.add(this.viewDiff);
  }

  setSelectedDate(kwcDate: KwcDate) {
    this.selected = this.selected.setDate(kwcDate);
    this.valueChanged.emit({
      localization: this.localization,
      kwcDate: this.selected,
      date: this.selected.toDate(),
    });
  }

  @State() view: ViewMode = 'month';

  switchView(view: ViewMode, kwcDate?: KwcDate) {
    this.view = view;
    if (kwcDate) this.viewState.setDate(kwcDate);
  }

  render() {
    return (
      <Host part={PARTS.CALENDAR}>
        <div part={PARTS.CALENDAR_HEADER} class="header">
          <button part={parts([PARTS.CALENDAR_NAV, PARTS.CALENDAR_NAV_ARROW, PARTS.CALENDAR_NAV_ARROW__PREV])} class="nav-arrow" onClick={() => this.moveToPrev()}>
            <slot name="arrow-left">🡠</slot>
          </button>

          {views.header[this.view]({
            localization: this.localization,
            viewState: this.viewState,
            onSwitchView: view => this.switchView(view),
          })}

          <button part={parts([PARTS.CALENDAR_NAV, PARTS.CALENDAR_NAV_ARROW, PARTS.CALENDAR_NAV_ARROW__NEXT])} class="nav-arrow" onClick={() => this.moveToNext()}>
            <slot name="arrow-right">🡢</slot>
          </button>
        </div>

        {views.body[this.view]({
          localization: this.localization,
          current: this.current,
          selected: this.selected,
          viewState: this.viewState,
          onDateSelected: (kwcDate: KwcDate) => this.setSelectedDate(kwcDate),
          onSwitchView: (view, kwcDate) => this.switchView(view, kwcDate),
        })}
      </Host>
    );
  }
}
