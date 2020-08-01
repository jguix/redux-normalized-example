import { User } from './user.types';

const loadUsers = (): Promise<User[]> => {
  return fetch(`https://jsonplaceholder.typicode.com/users`).then((response) => response.json());
};

const loadUser = (userId: number): Promise<User> => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((response) => response.json());
};

export const userApi = { loadUser, loadUsers };
