import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CardNumberPipe } from '../../shared/pipes/card-number-pipe';
import { CardService } from '../../shared/services/card.service';

@Component({
  selector: 'app-cards-page',
  imports: [NgClass, RouterLink, CardNumberPipe],
  templateUrl: './cards.page.html',
  styleUrl: './cards.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsPage {
  private cardService = inject(CardService);

  protected cardsResource = rxResource({
    stream: () => this.cardService.getCards(),
  });

  protected cards = computed(() => this.cardsResource.value() ?? []);

  logoutCard(event: MouseEvent, id: number) {
    event.stopPropagation();
    console.log('logged out card id: ' + id);
  }

  blockCard(event: MouseEvent, id: number) {
    event.stopPropagation();
    console.log('card blocked with id: ' + id);
  }
}
