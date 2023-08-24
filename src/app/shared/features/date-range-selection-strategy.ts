import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
    DateRange,
    MatDateRangeSelectionStrategy,
} from '@angular/material/datepicker';

@Injectable()
export class FiveDayRangeSelectionStrategy
  implements MatDateRangeSelectionStrategy<string>
{
  constructor(private _dateAdapter: DateAdapter<string>) {}

  selectionFinished(date: string | null): DateRange<string> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: string | null): DateRange<string> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: string | null): DateRange<any> {
    if (date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day == 0 ? -6 : 1);
      const start = new Date(d.setDate(diff));
      const end = new Date(d.setDate(diff + 6));
      return new DateRange<any>(start, end);
    }

    return new DateRange<string>(null, null);
  }
}
