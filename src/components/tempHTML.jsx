import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ExpenseLookups } from '../models/expense-lookup.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseLookupApiService {

  private readonly http = inject(HttpClient);

  getExpenseLookups() {
    return this.http.get<ExpenseLookups>(
      '/api/expense/lookups'
    );
  }
}






src/app/core/store/expense-lookup.store.ts


import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, tap, shareReplay } from 'rxjs';

import {
  ExpenseLookups,
  LookupItem
} from '../models/expense-lookup.model';

import { ExpenseLookupApiService } from '../services/expense-lookup-api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseLookupStore {

  private readonly api =
    inject(ExpenseLookupApiService);

  // Actual lookup data stored in memory
  private readonly _lookups =
    signal<ExpenseLookups | null>(null);

  // Read-only signal exposed to components
  readonly lookups =
    this._lookups.asReadonly();

  // Prevent multiple API calls
  private loadRequest$?: Observable<ExpenseLookups>;

  // --------------------------------
  // Load API
  // --------------------------------

  load(): Observable<ExpenseLookups> {

    // Already loaded
    if (this._lookups()) {
      return of(this._lookups()!);
    }

    // API request already in progress
    if (this.loadRequest$) {
      return this.loadRequest$;
    }

    // First API call
    this.loadRequest$ =
      this.api.getExpenseLookups().pipe(

        tap(data => {
          this._lookups.set(data);
        }),

        // Make all callers share the same API response
        shareReplay(1)
      );

    return this.loadRequest$;
  }

  // --------------------------------
  // Get individual lookup
  // --------------------------------

  getLookup(
    lookupKey: string
  ): LookupItem[] {

    const data = this._lookups();

    if (!data) {
      return [];
    }

    switch (lookupKey) {

      case 'VENDOR':
        return data.vendors;

      case 'CURRENCY':
        return data.currencies;

      case 'AIRPORT':
        return data.airports;

      case 'PAYMENT_TYPE':
        return data.paymentTypes;

      case 'BILLABLE':
        return data.billableValues;

      case 'CITY':
        return data.cities;

      case 'AIRLINE_TRAVEL_SERVICE_CODE':
        return data.airlineTravelServiceCodes;

      default:
        return [];
    }
  }

  // --------------------------------
  // Clear memory
  // --------------------------------

  clear(): void {
    this._lookups.set(null);
    this.loadRequest$ = undefined;
  }
}







api response:

{
  "vendors": [
    {
      "label": "Emirates",
      "value": "EK"
    }
  ],
  "currencies": [
    {
      "label": "US Dollar",
      "value": "USD"
    },
    {
      "label": "Indian Rupee",
      "value": "INR"
    }
  ],
  "airports": [
    {
      "label": "Chennai",
      "value": "MAA"
    }
  ],
  "paymentTypes": [
    {
      "label": "Credit Card",
      "value": "CARD"
    }
  ],
  "billableValues": [
    {
      "label": "Yes",
      "value": "YES"
    },
    {
      "label": "No",
      "value": "NO"
    }
  ],
  "cities": [
    {
      "label": "Chennai",
      "value": "CHENNAI"
    }
  ],
  "airlineTravelServiceCodes": []
}







src/app/features/expense/expense.component.ts

import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { ExpenseLookupStore } from '../../core/store/expense-lookup.store';

@Component({
  selector: 'app-expense',
  standalone: true,
  templateUrl: './expense.component.html'
})
export class ExpenseComponent implements OnInit {

  private readonly lookupStore =
    inject(ExpenseLookupStore);

  ngOnInit(): void {

    // Load lookup data once
    this.lookupStore.load().subscribe({
      next: () => {
        console.log('Expense lookups loaded');
      },

      error: error => {
        console.error(
          'Failed to load expense lookups',
          error
        );
      }
    });
  }
}




