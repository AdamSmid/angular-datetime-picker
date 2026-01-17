import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AD_MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER } from './date-selection-model';
import {
  AD_MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  AdMatDatepickerBase,
  AdMatDatepickerControl,
} from './datepicker-base';

// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
@Component({
  selector: 'mat-datetime-picker',
  template: '',
  exportAs: 'adMatDatetimePicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    AD_MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
    AD_MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
    { provide: AdMatDatepickerBase, useExisting: AdMatDatetimepicker },
  ],
})
export class AdMatDatetimepicker<D> extends AdMatDatepickerBase<
  AdMatDatepickerControl<D>,
  D | null,
  D
> {}
