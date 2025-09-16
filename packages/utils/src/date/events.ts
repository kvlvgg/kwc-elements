import { KwcDate } from './kwc-date';
import { KwcDateLocalization } from './kwc-date-localization';

export type KwcCalendarValueChanged = {
  localization: KwcDateLocalization;
  kwcDate: KwcDate;
  date: Date;
};
