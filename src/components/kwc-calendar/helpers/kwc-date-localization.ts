import { FIRST_DAY_OF_WEEK } from '../constants';
import { KwcDate } from './kwc-date';

export class KwcDateLocalization {
  locale: string;

  constructor(locale?: string) {
    this.locale = locale ?? (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language);
  }

  get firstDayOfWeek() {
    return FIRST_DAY_OF_WEEK[this.locale];
  }

  getDate(date: KwcDate) {
    const formatter = new Intl.DateTimeFormat(this.locale);
    return formatter.format(new Date(date.year, date.month, date.day));
  }

  getDay(date: KwcDate) {
    const formatter = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
    return formatter.format(new Date(date.year, date.month, date.day));
  }

  getWeekdays(format: 'short' | 'narrow' | 'long' = 'short'): string[] {
    const formatter = new Intl.DateTimeFormat(this.locale, { weekday: format });

    // В какой день начинается неделя (0 = вс, 1 = пн и т.д.)

    // 1970-01-04 — воскресенье
    const base = new Date(Date.UTC(1970, 0, 4));

    return Array.from({ length: 7 }, (_, i) => {
      const day = (this.firstDayOfWeek + i) % 7;
      const date = new Date(base);
      date.setUTCDate(base.getUTCDate() + day);
      return formatter.format(date);
    });
  }

  getMonth(date: KwcDate) {
    const formatter = new Intl.DateTimeFormat(this.locale, { month: 'long', year: 'numeric' });

    return formatter.format(new Date(date.year, date.month, date.day));
  }
}
