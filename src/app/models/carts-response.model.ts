import { Cart } from './cart.model';

export interface CartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}
