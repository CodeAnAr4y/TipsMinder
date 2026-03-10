import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cards',
    pathMatch: 'full',
  },
  {
    path: 'contract',
    loadComponent: () => import('./pages/contract/contract.page').then((m) => m.ContractPage),
  },
  {
    path: 'details/:cardId',
    loadComponent: () => import('./pages/details/details.page').then((m) => m.DetailsPage),
  },
  {
    path: 'cards',
    loadComponent: () => import('./pages/cards/cards.page').then((m) => m.CardsPage),
  },
];
