import { User } from './user.types';

export enum UserActionTypes {
  LOAD_USER = 'LOAD_USER',
  LOAD_USERS = 'LOAD_USERS',
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

export const userActions = {
  loadUserAction,
  loadUsersAction,
};
