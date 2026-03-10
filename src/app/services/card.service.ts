import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { forkJoin, map, Observable, of } from 'rxjs';
import { UsersResponse } from '../models/users-response.model';
import { BankCard, Card, cardStatusesArray, User } from '../models/user.model';
import { CartsResponse } from '../models/carts-response.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly apiUrl = environment.API_URL;
  private http = inject(HttpClient);

  private readonly statuses = cardStatusesArray;

  getCards(): Observable<Card[]> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`).pipe(
      map((resp) => {
        const rawCards: BankCard[] = resp.users.map((user: User) => user.bank);
        return rawCards.map((card, index) => ({
          ...card,
          id: index + 1,
          status: this.getRandomStatus(),
        }));
      })
    );
  }

  getDataByCardId(id: number): Observable<any> {
    const userData$ = this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      map(user => ({ username: user.username, bank: user.bank }))
    );
  
    const products$ = this.http.get<CartsResponse>(`${this.apiUrl}/carts/user/${id}`).pipe(
      map(resp => resp.carts.flatMap(cart => cart.products))
    );
  
    return forkJoin({
      user: userData$,
      products: products$
    });
  }

  private getRandomStatus(): 'active' | 'error' | 'expired' | 'suspended' {
    const randomIndex = Math.floor(Math.random() * this.statuses.length);
    return this.statuses[randomIndex];
  }
}
