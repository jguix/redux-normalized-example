import { AnyAction, combineReducers, Reducer } from 'redux';
import { FriendsActionTypes, LoadFriendsAction, SetFriendsOrderAction } from './friends.actions';

export type FriendsState = {
  orderFilter: 'asc' | 'desc';
  userIdsByOrderAsc: number[];
  userIdsByOrderDesc: number[];
};

export type FriendsStore = {
  friends: FriendsState;
};

export const orderFilterReducer = (state: 'asc' | 'desc' = 'asc', action: AnyAction) => {
  switch (action.type) {
    case FriendsActionTypes.SET_FRIENDS_ORDER:
      const { payload } = action as SetFriendsOrderAction;
      const { order } = payload;
      return order;
  }

  return state;
};

export const userIdsByOrderAscReducer = (state: number[] = [], action: AnyAction) => {
  switch (action.type) {
    case FriendsActionTypes.LOAD_FRIENDS:
      const { payload } = action as LoadFriendsAction;
      const { users, order } = payload;
      if (order === 'asc') {
        const userIds = users.map((user) => user.id);
        return [...state, ...userIds];
      }
      return state;
  }

  return state;
};

export const userIdsByOrderDescReducer = (state: number[] = [], action: AnyAction) => {
  switch (action.type) {
    case FriendsActionTypes.LOAD_FRIENDS:
      const { payload } = action as LoadFriendsAction;
      const { users, order } = payload;
      if (order === 'desc') {
        const userIds = users.map((user) => user.id);
        return [...state, ...userIds];
      }
      return state;
  }

  return state;
};

export const friendsReducer: Reducer<FriendsState> = combineReducers({
  orderFilter: orderFilterReducer,
  userIdsByOrderAsc: userIdsByOrderAscReducer,
  userIdsByOrderDesc: userIdsByOrderDescReducer,
});
