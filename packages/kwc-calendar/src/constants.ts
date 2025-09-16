export const PARTS = {
  CALENDAR: 'calendar',

  CALENDAR_HEADER: 'calendar-header',
  CALENDAR_NAV: 'calendar-nav',
  CALENDAR_YM_WRAPPER: 'calendar-nav-ym-wrapper',
  CALENDAR_NAV_MONTH: 'calendar-nav-month',
  CALENDAR_NAV_YEAR: 'calendar-nav-year',
  CALENDAR_NAV_ARROW: 'calendar-nav-arrow',
  CALENDAR_NAV_ARROW__PREV: 'calendar-nav--prev',
  CALENDAR_NAV_ARROW__NEXT: 'calendar-nav--next',

  CALENDAR_MONTH_VIEW: ['calendar-month-view', 'calendar-days-view'],
  CALENDAR_WEEK_DAY: 'calendar-weekday',
  CALENDAR_DAY: 'calendar-day',
  CALENDAR_DAY__CURRENT: 'calendar-day--current',
  CALENDAR_DAY__SELECTED: 'calendar-day--selected',
  CALENDAR_DAY__OUT_OF_MONTH: 'calendar-day--out-of-month',

  CALENDAR_YEAR_VIEW: ['calendar-year-view', 'calendar-months-view'],
  CALENDAR_MONTH: 'calendar-month',
  CALENDAR_MONTH__CURRENT: 'calendar-month--current',
  CALENDAR_MONTH__SELECTED: 'calendar-month--selected',

  CALENDAR_DECADE_VIEW: ['calendar-decade-view', 'calendar-years-view'],
  CALENDAR_YEAR: 'calendar-year',
  CALENDAR_YEAR__CURRENT: 'calendar-year--current',
  CALENDAR_YEAR__SELECTED: 'calendar-year--selected',
} as const;
