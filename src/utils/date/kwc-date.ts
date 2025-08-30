export class KwcDate {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly dayOfWeek: number;

  static now() {
    return new KwcDate();
  }

  constructor(date: Date = new Date()) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();
    this.dayOfWeek = date.getDay();
  }

  get daysInMonth(): number {
    return new Date(this.year, this.month + 1, 0).getDate();
  }

  get firstDayOfMonth(): KwcDate {
    return new KwcDate(new Date(this.year, this.month));
  }

  isEqual(date: KwcDate) {
    return this.year === date.year && this.month === date.month && this.day === date.day && this.dayOfWeek === date.dayOfWeek;
  }

  add(diff: { months?: number; days?: number }): KwcDate {
    return new KwcDate(new Date(this.year, this.month + (diff.months ?? 0), this.day + (diff.days ?? 0)));
  }

  substract(diff: { months?: number; days?: number }): KwcDate {
    return new KwcDate(new Date(this.year, this.month - (diff.months ?? 0), this.day - (diff.days ?? 0)));
  }

  toDate() {
    return new Date(this.year, this.month, this.day);
  }
}
