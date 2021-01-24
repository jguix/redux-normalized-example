import { OrderType } from '../shared/shared.types';
import { User } from './user.types';

export enum UserActionTypes {
  CACHE_USERS = 'USER:CACHE_USERS',
  LOAD_USER = 'USER:LOAD_USER',
  LOAD_USERS = 'USER:LOAD_USERS',
}

export type LoadUserPayload = {
  user: User;
};

export type LoadUserAction = {
  type: UserActionTypes.LOAD_USER;
  payload: LoadUserPayload;
};

const loadUserAction = (payload: LoadUserPayload): LoadUserAction => {
  return {
    payload,
    type: UserActionTypes.LOAD_USER,
  };
};

export type LoadUsersPayload = {
  users: User[];
};

export type LoadUsersAction = {
  type: UserActionTypes.LOAD_USERS;
  payload: LoadUsersPayload;
};

const loadUsersAction = (payload: LoadUsersPayload): LoadUsersAction => {
  return {
    payload,
    type: UserActionTypes.LOAD_USERS,
  };
};

export type CacheUsersPayload = {
  userIds: number[];
  page: number;
  limit: number;
  order: OrderType;
};

export type CacheUsersAction = {
  type: UserActionTypes.CACHE_USERS;
  payload: CacheUsersPayload;
};

const cacheUsersAction = (payload: CacheUsersPayload): CacheUsersAction => {
  return {
    payload,
    type: UserActionTypes.CACHE_USERS,
  };
};

export const userActions = {
  cacheUsersAction,
  loadUserAction,
  loadUsersAction,
};
