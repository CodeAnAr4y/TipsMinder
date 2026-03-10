import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { CardService } from '../../services/card.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TransactionTable } from '../../components/transaction-table/transaction-table';

@Component({
  selector: 'app-details-page',
  imports: [RouterLink, TransactionTable],
  templateUrl: './details.page.html',
  styleUrl: './details.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPage implements OnInit {
  private cardService = inject(CardService);
  protected cardId = input.required<number, string>({ transform: numberAttribute });

  protected details = rxResource({
    params: () => this.cardId(),
    stream: ({ params: id }) => this.cardService.getDataByCardId(id),
  });

  ngOnInit(): void {
    setTimeout(() => console.log(this.details.value()), 3000);
  }
}
