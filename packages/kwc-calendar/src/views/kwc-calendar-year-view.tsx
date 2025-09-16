import { h } from '@stencil/core';
import { parts } from '@kwc-elements/utils';

import { KwcDateLocalization } from '@kwc-elements/utils/date';

import { PARTS } from '../constants';
import { KwcDate } from '@kwc-elements/utils/date';
import { KwcViewBuilder } from '@kwc-elements/utils/date';

import type { ViewMode } from '../types';

export const KwcCalendarYearViewHeader = (props: { localization: KwcDateLocalization; viewState: KwcDate; onSwitchView: (view: ViewMode) => void }) => {
  return (
    <div part={PARTS.CALENDAR_YM_WRAPPER} class="nav-ym-wrapper">
      <button part={parts([PARTS.CALENDAR_NAV, PARTS.CALENDAR_NAV_YEAR])} class="nav-year" onClick={() => props.onSwitchView('decade')}>
        {props.localization.getYear(props.viewState)}
      </button>
    </div>
  );
};

export const KwcCalendarYearViewBody = (props: {
  localization: KwcDateLocalization;
  current: KwcDate;
  selected: KwcDate;
  viewState: KwcDate;
  onDateSelected: (kwcDate: KwcDate) => void;
  onSwitchView: (view: ViewMode, kwcDate: KwcDate) => void;
}) => {
  return (
    <div part={parts(PARTS.CALENDAR_YEAR_VIEW)} class="year-view">
      {KwcViewBuilder.create(props.localization)
        .forYear(props.viewState)
        .done()
        .map(x => (
          <button
            part={parts({
              [PARTS.CALENDAR_MONTH]: true,
              [PARTS.CALENDAR_MONTH__CURRENT]: x.isEqualByMonth(props.current),
              [PARTS.CALENDAR_MONTH__SELECTED]: x.isEqualByMonth(props.selected),
            })}
            class={{
              'btn-month': true,
              'selected': x.isEqualByMonth(props.selected),
              'current': x.isEqualByMonth(props.current),
            }}
            key={`${x.year}-${x.month}-${x.day}`}
            onClick={() => props.onSwitchView('month', x)}
          >
            {props.localization.getShortMonth(x)}
          </button>
        ))}
    </div>
  );
};
