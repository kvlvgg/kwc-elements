import { capitalize } from '../utils';

import { FIRST_DAY_OF_WEEK } from './constants';
import { KwcDate } from './kwc-date';

export class KwcDateLocalization {
  locale: string;

  constructor(locale?: string) {
    this.locale = locale ?? (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language);
  }

  get firstDayOfWeek() {
    return FIRST_DAY_OF_WEEK[this.locale];
  }

  getMinutes(date: KwcDate) {
    const formatter = new Intl.DateTimeFormat(this.locale, { timeStyle: 'short' });
    return formatter.format(date.toDate()).split(':')[1];
  }

  getHours(date: KwcDate) {
    const formatter = new Intl.DateTimeFormat(this.locale, { hour: '2-digit' });
    return formatter.format(date.toDate());
  }

  getDate(date: KwcDate) {
    // const formatter = new Intl.DateTimeFormat(this.locale, {
    //   year: 'numeric',
    //   month: 'numeric',
    //   day: 'numeric',
    //   hour: 'numeric',
    //   minute: 'numeric',
    //   hour12: false,
    // });

    const formatter = new Intl.DateTimeFormat(this.locale);
    return formatter.format(date.toDate());
  }

  getDay(date: KwcDate) {
    const formatter = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
    return formatter.format(date.toDate());
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
    const formatter = new Intl.DateTimeFormat(this.locale, { month: 'long' });

    return capitalize(formatter.format(date.toDate()));
  }

  getShortMonth(date: KwcDate) {
    const formatter = new Intl.DateTimeFormat(this.locale, { month: 'short' });

    return formatter.format(date.toDate());
  }

  getYear(date: KwcDate) {
    const formatter = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });

    return formatter.format(date.toDate());
  }

  getDecade(date: KwcDate) {
    const formatter = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });

    // TODO: вынести в KwcDate
    const start = date.substract({ years: date.year % 10 });
    const end = start.add({ years: 9 });

    return `${formatter.format(start.toDate())}-${formatter.format(end.toDate())}`;
  }
}
