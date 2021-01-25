import { User } from './user.types';
import { UserActionTypes, LoadUsersAction, LoadUserAction, CacheUsersAction } from './user.actions';
import { NumberIndexed, StringIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { LoadPostsAction, PostActionTypes } from '../post/post.actions';
import { userApi } from './user.api';

export type UserState = {
  byId: NumberIndexed<User>;
  cachedUserIds: StringIndexed<number[]>;
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

export const cachedUserIdsReducer = (state: StringIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case UserActionTypes.CACHE_USERS:
      const { payload } = action as CacheUsersAction;
      const { userIds, page, limit, order } = payload;
      const usersQuery = userApi.getUsersQuery(page, limit, order);

      return {
        ...state,
        [usersQuery]: userIds,
      };
  }

  return state;
};

export const postIdsByIdReducer = (state: NumberIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case PostActionTypes.LOAD_POSTS:
      const { payload } = action as LoadPostsAction;
      const { posts, userId } = payload;
      let loadedPostIdsByUserIdMap = posts.reduce(
        (postIdsbyUserIdMap, post) => ({
          ...postIdsbyUserIdMap,
          [post.userId]: postIdsbyUserIdMap[post.userId] ? [...postIdsbyUserIdMap[post.userId], post.id] : [post.id],
        }),
        {} as NumberIndexed<number[]>
      );
      if (posts.length === 0) {
        loadedPostIdsByUserIdMap = { [userId as number]: [] };
      }

      return {
        ...state,
        ...loadedPostIdsByUserIdMap,
      };
  }

  return state;
};

export const userReducer: Reducer<UserState> = combineReducers({
  byId: userByIdReducer,
  cachedUserIds: cachedUserIdsReducer,
  postIdsById: postIdsByIdReducer,
});
