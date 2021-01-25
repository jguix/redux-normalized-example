import { AnyAction, combineReducers, Reducer } from 'redux';
import { FriendsActionTypes, LoadFriendsAction, SetFriendsOrderAction } from './friends.actions';

export type FriendsState = {
  orderFilter: 'asc' | 'desc';
  userIds: number[];
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

export const userIdsReducer = (state: number[] = [], action: AnyAction) => {
  switch (action.type) {
    case FriendsActionTypes.LOAD_FRIENDS:
      const { payload } = action as LoadFriendsAction;
      const { userIds } = payload;
      return [...state, ...userIds];

    case FriendsActionTypes.SET_FRIENDS_ORDER:
      return [];
  }

  return state;
};

export const friendsReducer: Reducer<FriendsState> = combineReducers({
  orderFilter: orderFilterReducer,
  userIds: userIdsReducer,
});
