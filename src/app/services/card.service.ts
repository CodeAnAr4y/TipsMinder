import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { UsersResponse } from '../models/users-response.model';
import { BankCard } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly apiUrl = environment.API_URL;
  private http = inject(HttpClient);

  getCards(): Observable<BankCard[]> {
    return this.http
      .get<UsersResponse>(`${this.apiUrl}/users`)
      .pipe(
        // returns array of user's cards instead of UserResponse
        map((resp) => resp.users.map((user) => user.bank))
      );
  }
}
