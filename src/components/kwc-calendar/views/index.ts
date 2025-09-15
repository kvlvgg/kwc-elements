import { KwcCalendarMonthViewHeader, KwcCalendarMonthViewBody } from './kwc-calendar-month-view';
import { KwcCalendarYearViewHeader, KwcCalendarYearViewBody } from './kwc-calendar-year-view';
import { KwcCalendarDecadeViewHeader, KwcCalendarDecadeViewBody } from './kwc-calendar-decade-view';

export const views = {
  header: {
    month: KwcCalendarMonthViewHeader,
    year: KwcCalendarYearViewHeader,
    decade: KwcCalendarDecadeViewHeader,
  },

  body: {
    month: KwcCalendarMonthViewBody,
    year: KwcCalendarYearViewBody,
    decade: KwcCalendarDecadeViewBody,
  },
};
