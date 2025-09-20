import { h } from '@stencil/core';
import { parts } from '@kwc-elements/utils';

import { KwcDateLocalization } from '@kwc-elements/utils/date';

import { PARTS } from '../constants';
import { KwcDate } from '@kwc-elements/utils/date';
import { KwcViewBuilder } from '@kwc-elements/utils/date';

import type { ViewMode } from '../types';

export const KwcCalendarMonthViewHeader = (props: { localization: KwcDateLocalization; viewState: KwcDate; onSwitchView: (view: ViewMode, kwcDate?: KwcDate) => void }) => {
  return (
    <div part={PARTS.CALENDAR_YM_WRAPPER} class="nav-ym-wrapper">
      <button part={parts([PARTS.CALENDAR_NAV, PARTS.CALENDAR_NAV_MONTH])} class="nav-month" onClick={() => props.onSwitchView('year')}>
        {props.localization.getMonth(props.viewState)}
      </button>

      <button part={parts([PARTS.CALENDAR_NAV, PARTS.CALENDAR_NAV_YEAR])} class="nav-year" onClick={() => props.onSwitchView('decade')}>
        {props.localization.getYear(props.viewState)}
      </button>
    </div>
  );
};

export const KwcCalendarMonthViewBody = (props: {
  localization: KwcDateLocalization;
  current: KwcDate;
  selected: KwcDate;
  viewState: KwcDate;
  onDateSelected: (kwcDate: KwcDate) => void;
  onSwitchView: (view: ViewMode, kwcDate: KwcDate) => void;
}) => {
  return (
    <div part={parts(PARTS.CALENDAR_MONTH_VIEW)} class="month-view">
      {props.localization.getWeekdays().map(x => (
        <span part={PARTS.CALENDAR_WEEK_DAY} class="weekday" key={x}>
          {x}
        </span>
      ))}

      {KwcViewBuilder.create(props.localization)
        .forMonth(props.viewState)
        .padLeft()
        .padRight()
        .extend({ weeks: 6 })
        .done()
        .map(x => (
          <button
            part={parts({
              [PARTS.CALENDAR_DAY]: true,
              [PARTS.CALENDAR_DAY__CURRENT]: x.isEqualByDate(props.current),
              [PARTS.CALENDAR_DAY__SELECTED]: x.isEqualByDate(props.selected),
              [PARTS.CALENDAR_DAY__OUT_OF_MONTH]: x.month !== props.viewState.month % 12,
            })}
            class={{
              'btn-day': true,
              'selected': x.isEqualByDate(props.selected),
              'current': x.isEqualByDate(props.current),
              'out-of-month': x.month !== props.viewState.month % 12,
            }}
            key={`${x.year}-${x.month}-${x.day}`}
            onClick={() => props.onDateSelected(x)}
          >
            {props.localization.getDay(x)}
          </button>
        ))}
    </div>
  );
};
