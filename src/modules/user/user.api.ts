import { User } from './user.types';
import { OrderType } from '../shared/shared.types';

const loadUsers = (page: number, limit: number, order: OrderType): Promise<User[]> => {
  return fetch(`/users?_page=${page}&_limit=${limit}&_sort=name&_order=${order}`).then((response) => response.json());
};

const loadUser = (userId: number): Promise<User> => {
  return fetch(`/users/${userId}`).then((response) => response.json());
};

export const userApi = { loadUser, loadUsers };
