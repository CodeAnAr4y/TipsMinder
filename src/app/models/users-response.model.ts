import { User } from './user.model';

export interface UsersResponse {
  limit: number;
  skip: number;
  total: number;
  users: User[];
}
