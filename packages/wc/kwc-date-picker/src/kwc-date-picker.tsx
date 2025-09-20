import { Component, Host, h, State, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';
import { toDate } from '@kwc-elements/utils';
import { merge } from '@kwc-elements/utils';
import { parts, exportparts } from '@kwc-elements/utils';

import { KwcCalendarCustomEvent, KwcCalendarValueChanged } from '@kwc-elements/calendar/loader';

import { PARTS } from './constants';
import { PARTS as INPUT_GROUP_PARTS } from '@kwc-elements/input-group/constants';
import { PARTS as POPUP_PARTS } from '@kwc-elements/popup/constants';
import { PARTS as CALENDAR_PARTS } from '@kwc-elements/calendar/constants';
import { PARTS as TIME_PARTS } from '@kwc-elements/time/constants';

import '@kwc-elements/popup';

import { PassTrough } from './types';

@Component({
  tag: 'kwc-date-picker',
  styleUrl: 'kwc-date-picker.css',
  shadow: true,
})
export class KwcDatePicker {
  @Element() el: HTMLElement;

  @Prop() value: Date | string | null = null;
  @Prop() type: 'datetime' | 'date' | 'time' = 'date';
  @Prop() adjustPopupToInput: boolean = false;

  @Prop() pt: PassTrough;

  @Event() valueChanged: EventEmitter<Date>;

  @State() displayValue: string | null = null;
  @State() calendarValue: Date | string | null;

  refs: {
    popup: HTMLKwcPopupElement;
    inputWrapper: HTMLElement;
  } = {
    popup: null,
    inputWrapper: null,
  };

  componentWillLoad() {
    this.pt = merge(this.pt, {
      popup: { inline: false, offsetY: 0 },
      calendar: { locale: null },
    });

    this.onValueChanged(this.value);
  }

  @Watch('value')
  onValueChanged(value: Date | string | null) {
    this.calendarValue = toDate(value);
    if (!value) {
      // logic for null value
      return;
    }

    // this.selected = new KwcDate(value);
  }

  // setSelectedDate(date: KwcDate) {
  //   this.value = date;
  //   this.valueChanged.emit(date.toDate());
  // }

  togglePopup() {
    this.refs.popup.isOpen().then(visible => {
      if (visible) {
        this.refs.popup.close();
        return;
      }

      if (this.adjustPopupToInput) this.refs.popup.adjustWidth(this.refs.inputWrapper);
      this.refs.popup.registerCloseOutside(this.el);
      this.refs.popup.open(this.refs.inputWrapper);

      return;
    });
  }

  clear() {
    this.displayValue = null;
    this.calendarValue = null;
  }

  onCalendarValueChanged(e: KwcCalendarCustomEvent<KwcCalendarValueChanged>) {
    this.displayValue = e.detail.localization.getDate(e.detail.kwcDate);
    this.calendarValue = e.detail.date;
  }

  render() {
    return (
      <Host>
        <kwc-input-group ref={el => (this.refs.inputWrapper = el)} value={this.displayValue} exportparts={exportparts(INPUT_GROUP_PARTS)}>
          <span part={PARTS.DATE_PICKER_ICONS} slot="icons" class="icons">
            <span part={parts([PARTS.DATE_PICKER_ICON, PARTS.DATE_PICKER_ICON_CLEAR])} class="icon icon-clear" tabIndex={0} onClick={() => this.clear()}>
              <slot name="icon-clear">╳</slot>
            </span>

            <span part={parts([PARTS.DATE_PICKER_ICON, PARTS.DATE_PICKER_ICON_TOGGLE])} class="icon icon-toggle" tabIndex={0} onClick={() => this.togglePopup()}>
              <slot name="icon-toggle">📅</slot>
            </span>
          </span>
        </kwc-input-group>

        <kwc-popup ref={el => (this.refs.popup = el)} exportparts={exportparts(POPUP_PARTS)} {...this.pt.popup}>
          <kwc-calendar
            class={{ calendar: true, hidden: !['datetime', 'date'].includes(this.type) }}
            exportparts={exportparts(CALENDAR_PARTS)}
            value={this.calendarValue}
            {...this.pt.calendar}
            onValueChanged={e => this.onCalendarValueChanged(e)}
          >
            <slot name="calendar-arrow-left" slot="arrow-left">
              🡠
            </slot>

            <slot name="calendar-arrow-right" slot="arrow-right">
              🡢
            </slot>
          </kwc-calendar>

          <kwc-time exportparts={exportparts(TIME_PARTS)} class={{ time: true, hidden: !['datetime', 'time'].includes(this.type) }} value={this.calendarValue}>
            <slot name="time-hours-arrow-up" slot="hour-arrow-up">
              🡡
            </slot>

            <slot name="time-hours-arrow-down" slot="hour-arrow-down">
              🡣
            </slot>

            <slot name="time-separator" slot="separator">
              :
            </slot>

            <slot name="time-minutes-arrow-up" slot="minutes-arrow-up">
              🡡
            </slot>

            <slot name="time-minutes-arrow-down" slot="minutes-arrow-down">
              🡣
            </slot>
          </kwc-time>
        </kwc-popup>
      </Host>
    );
  }
}
