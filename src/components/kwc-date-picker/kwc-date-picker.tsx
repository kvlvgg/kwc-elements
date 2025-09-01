import { Component, Host, h, State, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';
import { toDate } from '../../utils/utils';
import { parts, exportparts } from '../../utils/parts';

import { KwcDate } from '../../utils/date/kwc-date';
import { KwcCalendarCustomEvent, KwcDateLocalization } from '../../components';

import { PARTS } from './constants';
import { PARTS as INPUT_GROUP_PARTS } from '../kwc-input-group/constants';
import { PARTS as CALENDAR_PARTS } from '../kwc-calendar/constants';

@Component({
  tag: 'kwc-date-picker',
  styleUrl: 'kwc-date-picker.css',
  shadow: true,
})
export class KwcDatePicker {
  @Element() el: HTMLElement;

  @Prop() value: Date | string | null = null;
  @Prop() mode: 'static' | 'popup' = 'static';
  @Prop() adjustPopupToInput: boolean = false;
  @Prop() popupOffsetY: number = 0;
  @Prop() locale: string | null = null;

  @Event({ eventName: 'value-changed' }) valueChanged: EventEmitter<Date>;

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
      this.refs.popup.open(this.refs.inputWrapper, this.popupOffsetY);

      return;
    });
  }

  clear() {
    this.displayValue = null;
    // TODO: some logic for calendar (selected, viewState)
  }

  onCalendarValueChanged(e: KwcCalendarCustomEvent<{ localization: KwcDateLocalization; kwcDate: KwcDate }>) {
    // this.setSelectedDate(e.detail.kwcDate);
    this.displayValue = e.detail.localization.getDate(e.detail.kwcDate);
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

        <kwc-popup ref={el => (this.refs.popup = el)} mode={this.mode}>
          <kwc-calendar
            class="calendar"
            exportparts={exportparts(CALENDAR_PARTS)}
            value={this.calendarValue}
            locale={this.locale}
            onValue-changed={e => this.onCalendarValueChanged(e)}
          >
            <slot name="calendar-arrow-left" slot="arrow-left">
              🡠
            </slot>
            <slot name="calendar-arrow-right" slot="arrow-right">
              🡢
            </slot>
          </kwc-calendar>
        </kwc-popup>
      </Host>
    );
  }
}
