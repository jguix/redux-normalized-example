import { AnyAction, combineReducers, Reducer } from 'redux';
import { LoadWallPostsAction, WallActionTypes } from './wall.actions';

export type WallState = {
  postIds: number[];
};

export type WallStore = {
  wall: WallState;
};

export const postIdsReducer = (state: number[] = [], action: AnyAction) => {
  switch (action.type) {
    case WallActionTypes.LOAD_POSTS:
      const { payload } = action as LoadWallPostsAction;
      const { postIds } = payload;
      return [...state, ...postIds];
  }

  return state;
};

export const wallReducer: Reducer<WallState> = combineReducers({
  postIds: postIdsReducer,
});
