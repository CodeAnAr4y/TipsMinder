import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { UsersResponse } from '../models/users-response.model';
import { BankCard, Card, cardStatusesArray } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly apiUrl = environment.API_URL;
  private http = inject(HttpClient);

  private readonly statuses = cardStatusesArray;

  getCards(): Observable<Card[]> {
    return this.http.get<any>(`${this.apiUrl}/users`).pipe(
      map((resp) => {
        const rawCards: BankCard[] = resp.users.map((user: any) => user.bank);
        return rawCards.map((card, index) => ({
          ...card,
          id: index + 1,
          status: this.getRandomStatus(),
        }));
      })
    );
  }

  private getRandomStatus(): 'active' | 'error' | 'expired' | 'suspended' {
    const randomIndex = Math.floor(Math.random() * this.statuses.length);
    return this.statuses[randomIndex];
  }
}
