import { combineReducers, Reducer } from 'redux';
import { userReducer, UserStore } from '../modules/user/user.reducer';
import { commentReducer, CommentStore } from '../modules/comment/comment.reducer';
import { postReducer, PostStore } from '../modules/post/post.reducer';
import { createStore } from 'redux';
import { friendsReducer, FriendsStore } from '../modules/friends/friends.reducer';

export type EntitiesStore = CommentStore & PostStore & UserStore;

export type UIStore = FriendsStore;

export type ApplicationStore = {
  entities: EntitiesStore;
  ui: UIStore;
};

export const entitiesReducer = combineReducers({
  comments: commentReducer,
  posts: postReducer,
  users: userReducer,
});

export const uiReducer = combineReducers({
  friends: friendsReducer,
});

export const rootReducer: Reducer<ApplicationStore> = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export const store = createStore(rootReducer);
