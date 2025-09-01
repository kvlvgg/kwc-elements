import { Component, h, Host, State, Prop, Element, Event, EventEmitter, Watch } from '@stencil/core';
import { toDate } from '../../utils/utils';
import { parts } from '../../utils/parts';

import { KwcDate } from '../../utils/date/kwc-date';
import { KwcViewBuilder } from '../../utils/date/kwc-view-builder';
import { KwcDateLocalization } from '../../utils/date/kwc-date-localization';

import type { KwcCalendarValueChanged } from '../../utils/date/events';

import { PARTS } from './constants';

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

  get view(): KwcDate[] {
    return KwcViewBuilder.create(this.localization).forMonth(this.viewState).padLeft().padRight().extend({ weeks: 6 }).done();
  }

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

  moveToPrevMonth() {
    this.viewState = this.viewState.substract({ months: 1 });
  }

  moveToNextMonth() {
    this.viewState = this.viewState.add({ months: 1 });
  }

  setSelectedDate(kwcDate: KwcDate) {
    this.selected = this.selected.setDate(kwcDate);
    this.valueChanged.emit({
      localization: this.localization,
      kwcDate: this.selected,
      date: this.selected.toDate(),
    });
  }

  render() {
    return (
      <Host part={PARTS.CALENDAR}>
        <div part={PARTS.CALENDAR_HEADER} class="header">
          <button part={parts([PARTS.CALENDAR_NAV, PARTS.CALENDAR_NAV__PREV])} class="arrow" onClick={() => this.moveToPrevMonth()}>
            <slot name="arrow-left">🡠</slot>
          </button>

          <span part={PARTS.CALENDAR_MONTH_LABEL}>{this.localization.getMonth(this.viewState)}</span>

          <button part={parts([PARTS.CALENDAR_NAV, PARTS.CALENDAR_NAV__NEXT])} class="arrow" onClick={() => this.moveToNextMonth()}>
            <slot name="arrow-right">🡢</slot>
          </button>
        </div>

        {this.localization.getWeekdays().map(x => (
          <span part={PARTS.CALENDAR_WEEK_DAY} class="weekday" key={x}>
            {x}
          </span>
        ))}

        {this.view.map(x => (
          <button
            part={parts({
              [PARTS.CALENDAR_DAY]: true,
              [PARTS.CALENDAR_DAY__CURRENT]: x.isEqualByDate(this.current),
              [PARTS.CALENDAR_DAY__SELECTED]: x.isEqualByDate(this.selected),
              [PARTS.CALENDAR_DAY__OUT_OF_MONTH]: x.month !== this.viewState.month % 12,
            })}
            class={{
              'btn-day': true,
              'selected': x.isEqualByDate(this.selected),
              'current': x.isEqualByDate(this.current),
              'out-of-month': x.month !== this.viewState.month % 12,
            }}
            key={`${x.year}-${x.month}-${x.day}`}
            onClick={() => this.setSelectedDate(x)}
          >
            {this.localization.getDay(x)}
          </button>
        ))}
      </Host>
    );
  }
}
