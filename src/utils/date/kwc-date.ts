export class KwcDate {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
  hours: number;
  minutes: number;

  static now() {
    return new KwcDate();
  }

  constructor(date: Date = new Date()) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();
    this.dayOfWeek = date.getDay();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
  }

  get daysInMonth(): number {
    return new Date(this.year, this.month + 1, 0).getDate();
  }

  get firstDayOfMonth(): KwcDate {
    return new KwcDate(new Date(this.year, this.month));
  }

  isEqualByDate(date: KwcDate) {
    return this.year === date.year && this.month === date.month && this.day === date.day && this.dayOfWeek === date.dayOfWeek;
  }

  isEqualByMonth(date: KwcDate) {
    return this.year === date.year && this.month === date.month;
  }

  isEqualByYear(date: KwcDate) {
    return this.year === date.year;
  }

  setDate(date: KwcDate) {
    this.year = date.year;
    this.month = date.month;
    this.day = date.day;

    return this;
  }

  add(diff: { years?: number; months?: number; days?: number; hours?: number; minutes?: number }): KwcDate {
    const result = {
      years: this.year + (diff.years ?? 0),
      month: this.month + (diff.months ?? 0),
      day: this.day + (diff.days ?? 0),
      hours: this.hours + (diff.hours ?? 0),
      minutes: this.minutes + (diff.minutes ?? 0),
    };

    return new KwcDate(new Date(result.years, result.month, result.day, result.hours, result.minutes));
  }

  substract(diff: { years?: number; months?: number; days?: number; hours?: number; minutes?: number }): KwcDate {
    const result = {
      years: this.year - (diff.years ?? 0),
      month: this.month - (diff.months ?? 0),
      day: this.day - (diff.days ?? 0),
      hours: this.hours - (diff.hours ?? 0),
      minutes: this.minutes - (diff.minutes ?? 0),
    };

    return new KwcDate(new Date(result.years, result.month, result.day, result.hours, result.minutes));
  }

  toDate() {
    return new Date(this.year, this.month, this.day, this.hours, this.minutes);
  }
}
