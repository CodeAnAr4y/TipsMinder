import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContractForm } from '../../shared/models/contract-form.model';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';

export type ContractFormControls = {
  [K in keyof ContractForm]: FormControl<K extends 'dateFrom' ? string | Date : string>;
};

@Component({
  selector: 'app-contract-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './contract.page.html',
  styleUrl: './contract.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractPage {
  private fb = inject(FormBuilder);

  protected contractModel = signal<ContractForm | null>(null);

  protected contractForm: FormGroup<ContractFormControls> = this.fb.nonNullable.group({
    companyName: ['', [Validators.required]],
    personalCode: ['', [Validators.required, Validators.minLength(6)]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contractNumber: ['', [Validators.required]],
    terminalMonthlyFee: ['', [Validators.required]],
    telephoneNumber: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
    bankAccountNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}\d+$/)]],
    dateFrom: [new Date().toISOString().split('T')[0], [Validators.required]],
  }) as FormGroup<ContractFormControls>;

  protected formErrors = toSignal(
    this.contractForm.events.pipe(
      startWith(null),
      map(() => {
        const errors: Record<string, boolean> = {};
        Object.keys(this.contractForm.controls).forEach((key) => {
          const control = this.contractForm.get(key);
          errors[key] = !!(control?.invalid && control?.touched);
        });
        return errors;
      })
    ),
    { initialValue: {} as Record<string, boolean> }
  );

  protected onSubmit(): void {
    if (this.contractForm.valid) {
      const rawValue = this.contractForm.getRawValue();

      const formValue: ContractForm = {
        ...rawValue,
        dateFrom: new Date(rawValue.dateFrom),
      };

      this.contractModel.set(formValue);
    } else {
      this.contractForm.markAllAsTouched();
    }
  }
}
