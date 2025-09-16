import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';

import { PARTS } from './constants';

import { toDate } from '@kwc-elements/utils';
import { KwcDate } from '@kwc-elements/utils/date';
import { KwcDateLocalization } from '@kwc-elements/utils/date';
import { KwcCalendarValueChanged } from '@kwc-elements/utils/date';

@Component({
  tag: 'kwc-time',
  styleUrl: 'kwc-time.css',
  shadow: true,
})
export class KwcTime {
  @Prop() value: Date | string | null = null;
  @Prop() locale: string | null = null;

  @State() timeValue: KwcDate = KwcDate.now();

  @Event() valueChanged: EventEmitter<KwcCalendarValueChanged>;

  localization!: KwcDateLocalization;

  componentWillLoad() {
    this.localization = new KwcDateLocalization(this.locale);
    this.onValueChanged(this.value);
  }

  @Watch('value')
  onValueChanged(value: Date | string | null) {
    value = toDate(value ?? KwcDate.now().toDate());

    this.timeValue = new KwcDate(value);
  }

  changeTime(op: 'add' | 'substract', diff: { hours?: number; minutes?: number }) {
    this.timeValue = this.timeValue[op](diff);
    this.valueChanged.emit({
      localization: this.localization,
      kwcDate: this.timeValue,
      date: this.timeValue.toDate(),
    });
  }

  render() {
    return (
      <Host part={PARTS.TIME}>
        <div part={PARTS.TIME_UNIT} class="time-unit">
          <button part={PARTS.TIME_NAV} class="time-nav" onClick={() => this.changeTime('add', { hours: 1 })}>
            <slot name="hour-arrow-up">🡡</slot>
          </button>

          <span>{this.localization.getHours(this.timeValue)}</span>

          <button part={PARTS.TIME_NAV} class="time-nav" onClick={() => this.changeTime('substract', { hours: 1 })}>
            <slot name="hour-arrow-down">🡣</slot>
          </button>
        </div>

        <div part={PARTS.TIME_SEPARATOR}>
          <slot name="separator">:</slot>
        </div>

        <div part={PARTS.TIME_UNIT} class="time-unit">
          <button part={PARTS.TIME_NAV} class="time-nav" onClick={() => this.changeTime('add', { minutes: 1 })}>
            <slot name="minutes-arrow-up">🡡</slot>
          </button>

          <span>{this.localization.getMinutes(this.timeValue)}</span>

          <button part={PARTS.TIME_NAV} class="time-nav" onClick={() => this.changeTime('substract', { minutes: 1 })}>
            <slot name="minutes-arrow-down">🡣</slot>
          </button>
        </div>
      </Host>
    );
  }
}
