report-expense-type.component.ts

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-report-expense-type',
  templateUrl: './report-expense-type.component.html'
})
export class ReportExpenseTypeComponent {

  // Parent owns the state
  receiptVisible = signal(true);

  toggleReceipt(): void {
    this.receiptVisible.update(value => !value);
  }
}




report-expense-type.component.html


<div class="flex w-full flex-col lg:flex-row">

  <!-- LEFT: Claim Type Detail -->
  <div
    class="w-full p-4 transition-all duration-300"
    [class.lg:w-1/2]="receiptVisible()"
    [class.lg:w-full]="!receiptVisible()"
  >

    <app-claim-type-detail
      [receiptVisible]="receiptVisible()"
      (receiptToggle)="toggleReceipt()"
    />

  </div>


  <!-- RIGHT: Expense Receipt -->
  @if (receiptVisible()) {

    <div
      class="w-full p-4 lg:w-1/2"
    >

      <app-expense-receipt />

    </div>

  }

</div>








claim-type-detail.component.ts

import {
  Component,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'app-claim-type-detail',
  templateUrl: './claim-type-detail.component.html'
})
export class ClaimTypeDetailComponent {

  // Parent → Child
  receiptVisible = input(true);

  // Child → Parent
  receiptToggle = output<void>();

  fields = [
    {
      name: 'Expense Type',
      type: 'text'
    },
    {
      name: 'Amount',
      type: 'number'
    },
    {
      name: 'Expense Date',
      type: 'date'
    },
    {
      name: 'Merchant',
      type: 'text'
    },
    {
      name: 'Currency',
      type: 'text'
    },
    {
      name: 'Description',
      type: 'text'
    },
    {
      name: 'Location',
      type: 'text'
    },
    {
      name: 'Cost Center',
      type: 'text'
    }
  ];

  toggleReceipt(): void {
    this.receiptToggle.emit();
  }
}







claim-type-detail.component.html


<div class="w-full">

  <!-- Header -->
  <div class="mb-4 flex items-center justify-between">

    <h2 class="text-xl font-semibold">
      Claim Type Details
    </h2>

    <button
      pButton
      type="button"
      [icon]="
        receiptVisible()
          ? 'pi pi-angle-right'
          : 'pi pi-angle-left'
      "
      [label]="
        receiptVisible()
          ? 'Hide Receipt'
          : 'Show Receipt'
      "
      (click)="toggleReceipt()"
    ></button>

  </div>


  <!-- Form -->
  <form>

    <div
      class="grid grid-cols-1 gap-4"
      [class.lg:grid-cols-2]="receiptVisible()"
      [class.lg:grid-cols-4]="!receiptVisible()"
    >

      @for (field of fields; track field.name) {

        <div class="w-full">

          <label class="mb-1 block font-medium">
            {{ field.name }}
          </label>


          @switch (field.type) {

            @case ('text') {

              <input
                pInputText
                class="w-full"
              />

            }

            @case ('number') {

              <p-inputnumber
                styleClass="w-full"
              />

            }

            @case ('date') {

              <p-datepicker
                styleClass="w-full"
              />

            }

          }

        </div>

      }

    </div>

  </form>

</div>













fields = signal([
  {
    name: 'Expense Type',
    type: 'select',
    required: true
  },
  {
    name: 'Amount',
    type: 'number',
    required: true
  },
  {
    name: 'Expense Date',
    type: 'date',
    required: true
  },
  {
    name: 'Merchant',
    type: 'text',
    required: false
  },
  {
    name: 'Currency',
    type: 'select',
    required: true
  },
  {
    name: 'Description',
    type: 'textarea',
    required: false
  },
  {
    name: 'Location',
    type: 'text',
    required: false
  },
  {
    name: 'Cost Center',
    type: 'select',
    required: true
  }
]);