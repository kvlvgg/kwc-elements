import { Component, h, Host, State, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { KwcDate } from './types';
import { KwcViewBuilder, getKwcDate, getLocalizedDate, getLocalizedWeekdays, getLocalizedMonth, isEqual } from './kwc-calendar-helper';

@Component({
  tag: 'kwc-calendar',
  styleUrl: 'kwc-calendar.css',
  shadow: true,
})
export class KwcCalendar {
  @Element() el: HTMLElement;

  @Prop() mode: 'static' | 'popup' = 'static';
  @Prop() adjustPopupToInput: boolean = false;
  @Prop() popupOffset: number = 4;

  @State() current: KwcDate = getKwcDate(new Date());
  @State() selected: KwcDate = getKwcDate(new Date());
  @State() viewState: KwcDate = getKwcDate(new Date());

  @Event({ eventName: 'date-changed' }) dateChanged: EventEmitter<Date>;

  refs: {
    popup: HTMLKwcPopupElement;
    inputWrapper: HTMLElement;
  } = {
    popup: null,
    inputWrapper: null,
  };

  get view(): KwcDate[] {
    return KwcViewBuilder.create().forMonth(this.viewState).padLeft().padRight().done();
  }

  moveToPrevMonth() {
    this.viewState = { ...this.viewState, month: this.viewState.month - 1 };
  }

  moveToNextMonth() {
    this.viewState = { ...this.viewState, month: this.viewState.month + 1 };
  }

  setSelectedDate(date: KwcDate) {
    this.selected = date;
    this.dateChanged.emit(new Date(date.year, date.month, date.day));
  }

  getDateButtonParts(date: KwcDate) {
    const parts = ['date-button'];

    if (isEqual(date, this.current)) parts.push('current-date-button');
    if (isEqual(date, this.selected)) parts.push('selected-date-button');
    if (date.month !== this.viewState.month % 12) parts.push('not-in-view-month-date-button');

    return parts.join(' ');
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
          <input part="calendar-input" class="calendar-input" value={getLocalizedDate(this.selected)} />
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

            <span part="header-date">{getLocalizedMonth(this.viewState)}</span>

            <button part="arrow right" onClick={() => this.moveToNextMonth()}>
              <slot name="arrow-right">⯈</slot>
            </button>
          </div>

          {getLocalizedWeekdays().map(x => (
            <span part="day-of-week" class="day-of-the-week" key={x}>
              {x}
            </span>
          ))}

          {this.view.map(x => (
            <button part={this.getDateButtonParts(x)} class="day" key={`${x.year}-${x.month}-${x.day}`} onClick={() => this.setSelectedDate(x)}>
              {x.day}
            </button>
          ))}
        </kwc-popup>
      </Host>
    );
  }
}
