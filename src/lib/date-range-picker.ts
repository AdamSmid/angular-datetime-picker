import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AD_MAT_CALENDAR_RANGE_STRATEGY_PROVIDER } from './date-range-selection-strategy';
import { AD_MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER, AdDateRange } from './date-selection-model';
import {
  AdMatDatepickerBase,
  AdMatDatepickerContent,
  AdMatDatepickerControl,
} from './datepicker-base';

/**
 * Input that can be associated with a date range picker.
 * @docs-private
 */
export interface AdMatDateRangePickerInput<D> extends AdMatDatepickerControl<D> {
  _getEndDateAccessibleName(): string | null;
  _getStartDateAccessibleName(): string | null;
  comparisonStart: D | null;
  comparisonEnd: D | null;
}

// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDateRangePicker"). We can change this to a
// directive if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the date range picker popup/dialog. */
@Component({
  selector: 'ad-mat-date-range-picker',
  template: '',
  exportAs: 'adMatDateRangePicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    AD_MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER,
    AD_MAT_CALENDAR_RANGE_STRATEGY_PROVIDER,
    { provide: AdMatDatepickerBase, useExisting: AdMatDateRangePicker },
  ],
})
export class AdMatDateRangePicker<D> extends AdMatDatepickerBase<
  AdMatDateRangePickerInput<D>,
  AdDateRange<D>,
  D
> {
  protected override _forwardContentValues(instance: AdMatDatepickerContent<AdDateRange<D>, D>) {
    super._forwardContentValues(instance);

    const input = this.datepickerInput;

    if (input) {
      instance.comparisonStart = input.comparisonStart;
      instance.comparisonEnd = input.comparisonEnd;
      instance.startDateAccessibleName = input._getStartDateAccessibleName();
      instance.endDateAccessibleName = input._getEndDateAccessibleName();
    }
  }
}
