import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Signal } from '@angular/core';
import { DetailsResponse } from '../../../../shared/services/card.service';

@Component({
  selector: 'app-transaction-table',
  imports: [CurrencyPipe],
  templateUrl: './transaction-table.html',
  styleUrl: './transaction-table.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionTable {
  public readonly details = input<DetailsResponse | undefined>();
}
