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

  forDecade(date: KwcDate) {
    const start = date.substract({ years: date.year % 10 });
    this.view = Array.from({ length: 10 }, (_, i) => start.add({ years: i }));

    return this;
  }

  forYear(date: KwcDate) {
    const start = date.substract({ months: date.month });
    this.view = Array.from({ length: 12 }, (_, i) => start.add({ months: i }));

    return this;
  }

  forMonth(date: KwcDate) {
    const firstDayOfMonth = date.firstDayOfMonth;
    const daysInMonth = date.daysInMonth;

    this.view = Array.from({ length: daysInMonth }, (_, i) => firstDayOfMonth.add({ days: i }));

    return this;
  }

  padLeft() {
    const [first] = this.view;
    this.view = [...Array.from({ length: (first.dayOfWeek - this.localization.firstDayOfWeek + 7) % 7 }, (_, i) => first.substract({ days: i + 1 })).reverse(), ...this.view];

    return this;
  }

  padRight() {
    const last = this.view.at(-1);
    this.view = [...this.view, ...Array.from({ length: (7 - last.dayOfWeek + this.localization.firstDayOfWeek - 1) % 7 }, (_, i) => last.add({ days: i + 1 }))];

    return this;
  }

  extend(options: { weeks: number }) {
    while (this.view.length < options.weeks * 7) {
      const last = this.view.at(-1);
      this.view = [...this.view, ...Array.from({ length: 7 }, (_, i) => last.add({ days: i + 1 }))];
    }

    return this;
  }

  done() {
    return this.view;
  }
}
