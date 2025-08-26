import { Component, h, Host, State, Prop, Element, Event, EventEmitter, Watch } from '@stencil/core';
import { toDate } from '../../utils/utils';
import { parts } from '../../utils/parts';

import { KwcDate } from './helpers/kwc-date';
import { KwcViewBuilder } from './helpers/kwc-view-builder';
import { KwcDateLocalization } from './helpers/kwc-date-localization';

@Component({
  tag: 'kwc-calendar',
  styleUrl: 'kwc-calendar.css',
  shadow: true,
})
export class KwcCalendar {
  @Element() el: HTMLElement;

  @Prop() value: Date | string | null = null;
  @Prop() mode: 'static' | 'popup' = 'static';
  @Prop() adjustPopupToInput: boolean = false;
  @Prop() popupOffset: number = 4;
  @Prop() locale: string | null = null;

  @State() current: KwcDate = new KwcDate();
  @State() selected: KwcDate = new KwcDate();
  @State() viewState: KwcDate = new KwcDate();

  @Event({ eventName: 'value-changed' }) valueChanged: EventEmitter<Date>;

  refs: {
    popup: HTMLKwcPopupElement;
    inputWrapper: HTMLElement;
  } = {
    popup: null,
    inputWrapper: null,
  };

  localization!: KwcDateLocalization;

  get view(): KwcDate[] {
    return KwcViewBuilder.create(this.localization).forMonth(this.viewState).padLeft().padRight().done();
  }

  componentWillLoad() {
    this.localization = new KwcDateLocalization(this.locale);
    this.onValueChanged(this.value);
  }

  @Watch('value')
  onValueChanged(value: Date | string | null) {
    value = toDate(value);
    if (!value) {
      // logic for null value
      return;
    }

    this.selected = new KwcDate(value);
    this.viewState = new KwcDate(value);
  }

  moveToPrevMonth() {
    this.viewState = this.viewState.substract({ months: 1 });
  }

  moveToNextMonth() {
    this.viewState = this.viewState.add({ months: 1 });
  }

  setSelectedDate(date: KwcDate) {
    this.selected = date;
    this.valueChanged.emit(date.toDate());
  }

  togglePopup() {
    this.refs.popup.isOpen().then(visible => {
      if (visible) {
        this.refs.popup.close();
        return;
      }

      if (this.adjustPopupToInput) this.refs.popup.adjustWidth(this.refs.inputWrapper);
      this.refs.popup.registerCloseOutside(this.el);
      this.refs.popup.open(this.refs.inputWrapper, this.popupOffset);

      return;
    });
  }

  render() {
    return (
      <Host>
        <div ref={el => (this.refs.inputWrapper = el)} part="calendar-input-wrapper" class="calendar-input-wrapper">
          <input part="calendar-input" class="calendar-input" value={this.localization.getDate(this.selected)} />
          <div class="calendar-icon-wrapper" tabIndex={0} onClick={() => this.togglePopup()}>
            <span class="calendar-icon">
              <slot name="calendar-icon">📅</slot>
            </span>
          </div>
        </div>

        <kwc-popup ref={el => (this.refs.popup = el)} class="calendar" mode={this.mode}>
          <div part="calendar-popup-header" class="header">
            <button part="arrow left" onClick={() => this.moveToPrevMonth()}>
              <slot name="arrow-left">⯇</slot>
            </button>

            <span part="header-date">{this.localization.getMonth(this.viewState)}</span>

            <button part="arrow right" onClick={() => this.moveToNextMonth()}>
              <slot name="arrow-right">⯈</slot>
            </button>
          </div>

          {this.localization.getWeekdays().map(x => (
            <span part="day-of-week" class="day-of-the-week" key={x}>
              {x}
            </span>
          ))}

          {this.view.map(x => (
            <button
              part={parts({
                'date-button': true,
                'current-date-button': x.isEqual(this.current),
                'selected-date-button': x.isEqual(this.selected),
                'not-in-view-month-date-button': x.month !== this.viewState.month % 12,
              })}
              class="day"
              key={`${x.year}-${x.month}-${x.day}`}
              onClick={() => this.setSelectedDate(x)}
            >
              {this.localization.getDay(x)}
            </button>
          ))}
        </kwc-popup>
      </Host>
    );
  }
}
