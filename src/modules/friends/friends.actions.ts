import { User } from '../user/user.types';
import { OrderType } from '../shared/shared.types';

export enum FriendsActionTypes {
  LOAD_FRIENDS = 'LOAD_FRIENDS',
  SET_FRIENDS_ORDER = 'SET_FRIENDS_ORDER',
}

export type LoadFriendsPayload = {
  userIds: number[];
};

export type LoadFriendsAction = {
  type: FriendsActionTypes.LOAD_FRIENDS;
  payload: LoadFriendsPayload;
};

const loadFriendsAction = (payload: LoadFriendsPayload): LoadFriendsAction => {
  return {
    payload,
    type: FriendsActionTypes.LOAD_FRIENDS,
  };
};

export type SetFriendsOrderPayload = {
  order: OrderType;
};

export type SetFriendsOrderAction = {
  type: FriendsActionTypes.SET_FRIENDS_ORDER;
  payload: SetFriendsOrderPayload;
};

const setFriendsOrderAction = (payload: SetFriendsOrderPayload): SetFriendsOrderAction => {
  return {
    payload,
    type: FriendsActionTypes.SET_FRIENDS_ORDER,
  };
};

export const friendsActions = {
  loadFriendsAction,
  setFriendsOrderAction,
};
