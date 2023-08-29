import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  DateRange,
  MatDateRangeSelectionStrategy,
} from '@angular/material/datepicker';

@Injectable()
export class CustomRangeSelectionStrategy
  implements MatDateRangeSelectionStrategy<Date>
{
  constructor(private _dateAdapter: DateAdapter<Date>) {}

  selectionFinished(date: Date | null): DateRange<Date> {
    return this._createCustomRange(date);
  }

  createPreview(activeDate: Date | null): DateRange<Date> {
    return this._createCustomRange(activeDate);
  }

  private _createCustomRange(date: Date | null): DateRange<Date> {
    if (date) {
      const selectedDate = this._dateAdapter.deserialize(date) || new Date();
      const startOfWeek = this._getStartOfWeek(selectedDate);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 5); // Change this line to add 5 days (Mon to Sat)

      return new DateRange<Date>(startOfWeek, endOfWeek);
    }

    return new DateRange<Date>(null, null);
  }

  private _getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const daysToSubtract = day === 0 ? 6 : day - 1;
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - daysToSubtract);
    return startOfWeek;
  }
}
