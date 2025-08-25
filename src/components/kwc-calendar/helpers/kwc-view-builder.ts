import { KwcDate } from './kwc-date';
import { KwcDateLocalization } from './kwc-date-localization';

export class KwcViewBuilder {
  view: KwcDate[];
  localization: KwcDateLocalization;

  constructor(localization: KwcDateLocalization) {
    this.localization = localization;
  }

  static create(localization: KwcDateLocalization) {
    return new KwcViewBuilder(localization);
  }

  forMonth(date: KwcDate) {
    const firstDayOfMonth = date.firstDayOfMonth;
    const daysInMonth = date.daysInMonth;

    this.view = Array.from({ length: daysInMonth }, (_, i) => firstDayOfMonth.add({ days: i }));

    return this;
  }

  padLeft() {
    const [first] = this.view;
    const lastOfPrevMonth = new KwcDate(new Date(first.year, first.month, 0));

    this.view = [...Array.from({ length: (first.dayOfWeek - this.localization.firstDayOfWeek + 7) % 7 }, (_, i) => lastOfPrevMonth.substract({ days: i })).reverse(), ...this.view];

    return this;
  }

  padRight() {
    const last = this.view[this.view.length - 1];
    const firstOfNextMonth = new KwcDate(new Date(last.year, last.month, last.day + 1));

    const isLessOrEqual35 = this.view.length <= 35;

    this.view = [...this.view, ...Array.from({ length: ((7 - last.dayOfWeek) % 7) + (isLessOrEqual35 ? 7 : 0) }, (_, i) => firstOfNextMonth.add({ days: i }))];

    return this;
  }

  done() {
    return this.view;
  }
}
