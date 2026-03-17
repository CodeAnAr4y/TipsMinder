import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContractForm } from '../../shared/models/contract-form.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-contract-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './contract.page.html',
  styleUrl: './contract.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractPage {
  private fb = inject(FormBuilder);

  protected contractModel = signal<ContractForm>({
    companyName: '',
    personalCode: '',
    address: '',
    email: '',
    contractNumber: '',
    terminalMonthlyFee: '',
    telephoneNumber: '',
    bankAccountNumber: '',
    dateFrom: new Date(),
  });

  protected contractForm = this.fb.nonNullable.group({
    companyName: ['', [Validators.required]],
    personalCode: ['', [Validators.required, Validators.minLength(6)]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contractNumber: ['', [Validators.required]],
    terminalMonthlyFee: ['', [Validators.required]],
    telephoneNumber: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
    bankAccountNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}\d+$/)]],
    dateFrom: [new Date().toISOString().split('T')[0], [Validators.required]],
  });

  protected onSubmit() {
    if (this.contractForm.valid) {
      const rawValue = this.contractForm.getRawValue();
  
      const formValue: ContractForm = {
        ...rawValue,
        dateFrom: new Date(rawValue.dateFrom)
      };
  
      this.contractModel.set(formValue);
      console.log('Submitted:', this.contractModel());
    } else {
      this.contractForm.markAllAsTouched();
    }
  }
}
