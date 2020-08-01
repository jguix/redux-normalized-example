import { User } from './user.types';
import { UserActionTypes, LoadUsersAction, LoadUserAction } from './user.actions';
import { NumberIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { LoadPostsAction, PostActionTypes } from '../post/post.actions';

export type UserState = {
  byId: NumberIndexed<User>;
  postIdsById: NumberIndexed<number[]>; // one-to-many relation
};

export type UserStore = {
  users: UserState;
};

export const userByIdReducer = (state: NumberIndexed<User> = {}, action: AnyAction) => {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS:
      const { payload } = action as LoadUsersAction;
      const { users } = payload;
      const loadedUsersMap = users.reduce((map, user) => ({ ...map, [user.id]: user }), {});

      return {
        ...state,
        ...loadedUsersMap,
      };

    case UserActionTypes.LOAD_USER:
      const { payload: userPayload } = action as LoadUserAction;
      const { user } = userPayload;

      return {
        ...state,
        [user.id]: user,
      };
  }

  return state;
};

export const postIdsByIdReducer = (state: NumberIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case PostActionTypes.LOAD_POSTS:
      const { payload } = action as LoadPostsAction;
      const { posts } = payload;
      const loadedPostIdsbyUserIdMap = posts.reduce(
        (postIdsbyUserIdMap, post) => ({
          ...postIdsbyUserIdMap,
          [post.userId]: postIdsbyUserIdMap[post.userId] ? [...postIdsbyUserIdMap[post.userId], post.id] : [post.id],
        }),
        {} as NumberIndexed<number[]>
      );

      return {
        ...state,
        ...loadedPostIdsbyUserIdMap,
      };
  }

  return state;
};

export const userReducer: Reducer<UserState> = combineReducers({
  byId: userByIdReducer,
  postIdsById: postIdsByIdReducer,
});
