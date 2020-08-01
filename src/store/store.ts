import { combineReducers, Reducer } from 'redux';
import { userReducer, UserStore } from '../modules/user/user.reducer';
import { commentReducer, CommentStore } from '../modules/comment/comment.reducer';
import { postReducer, PostStore } from '../modules/post/post.reducer';
import { createStore } from 'redux';

export type EntitiesStore = CommentStore & PostStore & UserStore;

export type ApplicationStore = {
  entities: EntitiesStore;
};

export const entitiesReducer = combineReducers({
  comments: commentReducer,
  posts: postReducer,
  users: userReducer,
});

export const rootReducer: Reducer<ApplicationStore> = combineReducers({
  entities: entitiesReducer,
});

export const store = createStore(rootReducer);
