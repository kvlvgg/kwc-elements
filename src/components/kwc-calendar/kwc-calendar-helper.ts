import { FIRST_DAY_OF_WEEK } from './constants';
import type { KwcDate } from './types';

export function getKwcDate(date: Date): KwcDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    dayOfWeek: date.getDay(),
  };
}

export function isEqual(aDate: KwcDate, bDate: KwcDate) {
  return aDate.year === bDate.year && aDate.month === bDate.month && aDate.day === bDate.day && aDate.dayOfWeek === bDate.dayOfWeek;
}

export function getDaysInMonth(date: KwcDate): number {
  return new Date(date.year, date.month + 1, 0).getDate();
}

export function getFirstDayOfMonth(date: KwcDate): KwcDate {
  return getKwcDate(new Date(date.year, date.month));
}

export function add(date: KwcDate, daysDiff: number): KwcDate {
  return {
    ...date,
    day: date.day + daysDiff,
    dayOfWeek: (date.dayOfWeek + daysDiff) % 7,
  };
}

function getLocale() {
  return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
}

export function substract(date: KwcDate, daysDiff: number): KwcDate {
  return {
    ...date,
    day: date.day - daysDiff,
    dayOfWeek: (date.dayOfWeek - daysDiff) % 7,
  };
}

export function getFirstDayOfWeek(locale = getLocale()): number {
  const norm = locale.toLowerCase();
  return FIRST_DAY_OF_WEEK[norm] ?? 1; // по умолчанию — понедельник
}

export function getLocalizedDate(date: KwcDate, locale = getLocale()) {
  const formatter = new Intl.DateTimeFormat(locale);

  return formatter.format(new Date(date.year, date.month, date.day));
}

export function getLocalizedWeekdays(locale: string = getLocale(), firstDay: number = getFirstDayOfWeek(), format: 'short' | 'narrow' | 'long' = 'short'): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: format });

  // // В какой день начинается неделя (0 = вс, 1 = пн и т.д.)
  // const start = firstDay ?? getFirstDayOfWeek();

  // 1970-01-04 — воскресенье
  const base = new Date(Date.UTC(1970, 0, 4));

  return Array.from({ length: 7 }, (_, i) => {
    const day = (firstDay + i) % 7;
    const date = new Date(base);
    date.setUTCDate(base.getUTCDate() + day);
    return formatter.format(date);
  });
}

export function getLocalizedMonth(date: KwcDate, locale: string = getLocale()) {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });

  return formatter.format(new Date(date.year, date.month, date.day));
}

export class KwcViewBuilder {
  view: KwcDate[];

  static create() {
    return new KwcViewBuilder();
  }

  forMonth(date: KwcDate) {
    const firstDayOfMonth = getFirstDayOfMonth(date);
    const daysInMonth = getDaysInMonth(date);

    this.view = Array.from({ length: daysInMonth }, (_, i) => add(firstDayOfMonth, i));

    return this;
  }

  padLeft() {
    const [first] = this.view;
    const lastOfPrevMonth = getKwcDate(new Date(first.year, first.month, 0));

    this.view = [...Array.from({ length: (first.dayOfWeek - getFirstDayOfWeek() + 7) % 7 }, (_, i) => substract(lastOfPrevMonth, i)).reverse(), ...this.view];

    return this;
  }

  padRight() {
    const last = this.view[this.view.length - 1];
    const firstOfNextMonth = getKwcDate(new Date(last.year, last.month, last.day + 1));

    const isLessOrEqual35 = this.view.length <= 35;

    this.view = [...this.view, ...Array.from({ length: ((7 - last.dayOfWeek) % 7) + (isLessOrEqual35 ? 7 : 0) }, (_, i) => add(firstOfNextMonth, i))];

    return this;
  }

  done() {
    return this.view;
  }
}
