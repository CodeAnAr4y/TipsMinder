import { Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-cards-page',
  imports: [NgClass],
  templateUrl: './cards.page.html',
  styleUrl: './cards.page.css',
})
export class CardsPage {
  private cardService = inject(CardService);

  protected cardsResource = rxResource({
    stream: () => this.cardService.getCards(),
  });

  protected cards = computed(() => this.cardsResource.value() ?? []);

  logoutCard(id: number) {
    /* ... */
  }
  blockCard(id: number) {
    /* ... */
  }
}
