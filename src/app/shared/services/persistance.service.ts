import { Injectable } from '@angular/core';

@Injectable()
export class PersistanceService {
  set(key: string, data: string): void {
    try {
      localStorage.setItem(key, data);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string): string {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return '';
      }
      return item;
    } catch (e) {
      console.error('Error getting data from the localStorage', e);
      return '';
    }
  }
}
