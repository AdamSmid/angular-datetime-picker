import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  booleanAttribute,
  viewChild,
} from '@angular/core';
import { AdMatDatepickerBase, AdMatDatepickerControl } from './datepicker-base';

/** Button that will close the datepicker and assign the current selection to the data model. */
@Directive({
  selector: '[adMatDatepickerApply], [adMatDateRangePickerApply]',
  host: { '(click)': '_applySelection()' },
})
export class AdMatDatepickerApply {
  constructor(
    public readonly _datepicker: AdMatDatepickerBase<AdMatDatepickerControl<any>, unknown>,
  ) {}

  _applySelection() {
    this._datepicker._applyPendingSelection();
    this._datepicker.close();
  }
}

@Directive({
  selector: '[adMatDatepickerClear], [adMatDateRangePickerClear]',
  host: { '(click)': '_clearSelection()' },
})
export class AdMatDatepickerClear {
  constructor(
    public readonly _datepicker: AdMatDatepickerBase<AdMatDatepickerControl<any>, unknown>,
  ) {}

  @Input({
    transform: booleanAttribute,
  })
  close: boolean = false;

  _clearSelection() {
    this._datepicker._clearSelection();
    if (this.close) {
      this._datepicker.close();
    }
  }
}

/** Button that will close the datepicker and discard the current selection. */
@Directive({
  selector: '[adMatDatepickerCancel], [adMatDateRangePickerCancel]',
  host: { '(click)': '_datepicker.close()' },
})
export class AdMatDatepickerCancel {
  constructor(
    public readonly _datepicker: AdMatDatepickerBase<AdMatDatepickerControl<any>, unknown>,
  ) {}
}

/**
 * Container that can be used to project a row of action buttons
 * to the bottom of a datepicker or date range picker.
 */
@Component({
  selector: 'ad-mat-datepicker-actions, ad-mat-date-range-picker-actions',
  styleUrls: ['datepicker-actions.scss'],
  template: `
    <ng-template>
      <div class="mat-datepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AdMatDatepickerActions implements AfterViewInit, OnDestroy {
  _template = viewChild<TemplateRef<unknown>>(TemplateRef);
  private _portal: TemplatePortal;

  constructor(
    private _datepicker: AdMatDatepickerBase<AdMatDatepickerControl<any>, unknown>,
    private _viewContainerRef: ViewContainerRef,
  ) {}

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._template(), this._viewContainerRef);
    this._datepicker.registerActions(this._portal);
  }

  ngOnDestroy() {
    this._datepicker.removeActions(this._portal);

    // Needs to be null checked since we initialize it in `ngAfterViewInit`.
    if (this._portal && this._portal.isAttached) {
      this._portal?.detach();
    }
  }
}
