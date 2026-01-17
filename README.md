# Angular Material DatetimePicker

## Description

## Demo

@see [Stackblitz demo](https://stackblitz.com/edit/demo-mat-datetime-picker)

![Alt Text](picker.png)

Choose the version corresponding to your Angular version:

| Angular | @adamsmid/datetime-picker        |
| ------- | ------------------------------- |
| 20      | 20.x+                           |


## Getting started

```
npm install --save  @adamsmid/datetime-picker
```

## Setup

Add the date provider to your app configuration.

[!IMPORTANT] to prevent the \_ERROR Error: AdMatDatetimePicker: No provider found for DateAdapter.
You must import one of the following providers at your application root or standalone component:
provideNativeDateAdapter, provideMomentDateAdapter, provideLuxonDateAdapter, provideDateFnsAdapter,
or provide a custom implementation.

```typescript
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    ...,
    provideNativeDateAdapter(),
    ...,
  ],
};
```

On your component, you can use the datepicker as follows:

```typescript
import {
  AdMatDatepickerActions,
  AdMatDatepickerApply,
  AdMatDatepickerCancel,
  AdMatDatepickerClear,
  AdMatDatepickerInput,
  AdMatDatetimepicker,
} from '@adamsmid/datetime-picker';

@Component({
  selector: 'test',
  imports: [
    AdMatDatepickerActions,
    AdMatDatepickerActions,
    AdMatDatepickerApply,
    AdMatDatepickerCancel,
    AdMatDatepickerClear,
    AdMatDatepickerInput,
    AdMatDatetimepicker,
    ..., // other imports
  ],
  template: `
    <input matInput [adMatDatetimePicker]="event" class="hidden" />

    <mat-datetime-picker #event>
      <ad-mat-datepicker-actions>
        <div class="flex w-full justify-between">
          <button mat-button adMatDatepickerClear>Clear</button>
          <div>
            <button mat-button adMatDatepickerCancel>Cancel</button>
            <button mat-raised-button color="primary" adMatDatepickerApply>Apply</button>
          </div>
        </div>
      </ad-mat-datepicker-actions>
    </mat-datetime-picker>
  `,
})
export class TestComponent {}
```

## Using the component The same API as @angular/material Datepicker (@see [API

docs](https://material.angular.io/components/datepicker/api)) ### Datetime Picker
(mat-datetime-picker)

```html
<mat-form-field>
  <input
    matInput
    [adMatDatetimePicker]="picker"
    placeholder="Choose a date"
    [formControl]="dateControl"
    [min]="minDate"
    [max]="maxDate"
    [disabled]="disabled" />
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datetime-picker
    #picker
    [showSpinners]="showSpinners"
    [showSeconds]="showSeconds"
    [stepHour]="stepHour"
    [stepMinute]="stepMinute"
    [stepSecond]="stepSecond"
    [touchUi]="touchUi"
    [color]="color"
    [enableMeridian]="enableMeridian"
    [disableMinute]="disableMinute"
    [hideTime]="hideTime">
  </mat-datetime-picker>
</mat-form-field>
```

### Timepicker (ad-mat-timepicker)

```
<ad-mat-timepicker [(ngModel)]="date"></ad-mat-timepicker>
<ad-mat-timepicker [(ngModel)]="date" [disabled]="disabled"></ad-mat-timepicker>
<ad-mat-timepicker [(ngModel)]="date" [stepHour]="2" [stepMinute]="5" [stepSecond]="10"></ad-mat-timepicker>
<ad-mat-timepicker [(ngModel)]="date" [showSpinners]="showSpinners"></ad-mat-timepicker>
<ad-mat-timepicker [(ngModel)]="date" [showSeconds]="showSeconds"></ad-mat-timepicker>
<ad-mat-timepicker [(ngModel)]="date" [disableMinute]="disableMinute"></ad-mat-timepicker>
<ad-mat-timepicker [(ngModel)]="date" [defaultTime]="defaultTime"></ad-mat-timepicker>
<ad-mat-timepicker [formControl]="formControl"></ad-mat-timepicker>
```

#### List of @Input of ad-mat-timepicker

_You can use all @Input of ad-mat-timepicker for mat-datetime-picker_

| @Input             | Type         | Default value | Description                                                                                                                                                                  |
| ------------------ | ------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **disabled**       | boolean      | null          | If true, the picker is readonly and can't be modified                                                                                                                        |
| **showSpinners**   | boolean      | true          | If true, the spinners above and below input are visible                                                                                                                      |
| **showSeconds**    | boolean      | true          | If true, it is not possible to select seconds                                                                                                                                |
| **disableMinute**  | boolean      | false         | If true, the minute (and second) is readonly                                                                                                                                 |
| **defaultTime**    | Array        | undefined     | An array [hour, minute, second] for default time when the date is not yet defined                                                                                            |
| **stepHour**       | number       | 1             | The number of hours to add/substract when clicking hour spinners                                                                                                             |
| **stepMinute**     | number       | 1             | The number of minutes to add/substract when clicking minute spinners                                                                                                         |
| **stepSecond**     | number       | 1             | The number of seconds to add/substract when clicking second spinners                                                                                                         |
| **color**          | ThemePalette | undefined     | Color palette to use on the datepicker's calendar.                                                                                                                           |
| **enableMeridian** | boolean      | false         | Whether to display 12H or 24H mode.                                                                                                                                          |
| **hideTime**       | boolean      | false         | If true, the time is hidden.                                                                                                                                                 |
| **touchUi**        | boolean      | false         | Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather than a popup and elements have more padding to allow for bigger touch targets. |

## Choosing a date implementation and date format settings

[NativeDateAdapter](https://github.com/angular/components/blob/main/src/material/core/datetime/index.ts)
[DateFnsAdapter](https://github.com/angular/components/blob/main/src/material-date-fns-adapter/adapter/index.ts)
[LuxonDateAdapter](https://github.com/angular/components/blob/main/src/material-luxon-adapter/adapter/index.ts)
[MomentDateAdapter](https://github.com/angular/components/blob/main/src/material-moment-adapter/adapter/index.ts)

For example:

Creating a custom date adapter:

```
@Injectable()
export class CustomDateAdapter extends DateAdapter<D> {...}
// D can be Date, Moment or customized type
```

```
// If using Moment
const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: "l, LTS"
  },
  display: {
    dateInput: "l, LTS",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};
```

Creating a custom date adapter module

```
export function provideAdMatCustomDate() {
  return makeEnvironmentProviders([
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ]);
}

```

You can also customize the date format by providing your custom MAT_DATE_FORMATS in your module.

## Theming

- @see @angular/material
  [Using a pre-built theme](https://material.angular.io/guide/theming#using-a-pre-built-theme)
- Add the Material Design icon font to your index.html

```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block" rel="stylesheet">
```

## License

MIT
