import { h } from '@stencil/core';
import { parts } from '../../../utils/parts';

import { KwcDateLocalization } from '../../../utils/date/kwc-date-localization';

import { PARTS } from '../constants';
import { KwcDate } from '../../../utils/date/kwc-date';
import { KwcViewBuilder } from '../../../utils/date/kwc-view-builder';

import type { ViewMode } from '../types';

export const KwcCalendarDecadeViewHeader = (props: { localization: KwcDateLocalization; viewState: KwcDate; onSwitchView: (view: ViewMode) => void }) => {
  return (
    <div part={PARTS.CALENDAR_YM_WRAPPER} class="nav-ym-wrapper">
      <span class="nav-decade">{props.localization.getDecade(props.viewState)}</span>
    </div>
  );
};

export const KwcCalendarDecadeViewBody = (props: {
  localization: KwcDateLocalization;
  current: KwcDate;
  selected: KwcDate;
  viewState: KwcDate;
  onDateSelected: (kwcDate: KwcDate) => void;
  onSwitchView: (view: ViewMode, kwcDate: KwcDate) => void;
}) => {
  return (
    <div part={parts(PARTS.CALENDAR_DECADE_VIEW)} class="decade-view">
      {KwcViewBuilder.create(props.localization)
        .forDecade(props.viewState)
        .done()
        .map(x => (
          <button
            part={parts({
              [PARTS.CALENDAR_YEAR]: true,
              [PARTS.CALENDAR_YEAR__CURRENT]: x.isEqualByYear(props.current),
              [PARTS.CALENDAR_YEAR__SELECTED]: x.isEqualByYear(props.selected),
            })}
            class={{
              'btn-year': true,
              'selected': x.isEqualByYear(props.selected),
              'current': x.isEqualByYear(props.current),
            }}
            key={`${x.year}-${x.month}-${x.day}`}
            onClick={() => props.onSwitchView('year', x)}
          >
            {props.localization.getYear(x)}
          </button>
        ))}
    </div>
  );
};
