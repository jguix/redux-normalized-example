import { AnyAction, combineReducers, Reducer } from 'redux';
import { FriendWallActionTypes, LoadFriendWallPostsAction } from './friend-wall.actions';
import { NumberIndexed } from '../shared/shared.types';

export type FriendWallState = {
  postIdsById: NumberIndexed<number[]>; // one-to-many relation
};

export type FriendWallStore = {
  friendWall: FriendWallState;
};

export const postIdsByIdReducer = (state: NumberIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case FriendWallActionTypes.LOAD_POSTS:
      const { payload } = action as LoadFriendWallPostsAction;
      const { postIds, userId } = payload;

      return {
        ...state,
        [userId]: state[userId] ? [...state[userId], ...postIds] : [...postIds],
      };
  }

  return state;
};

export const friendWallReducer: Reducer<FriendWallState> = combineReducers({
  postIdsById: postIdsByIdReducer,
});
