import { combineReducers, createStore, Reducer } from 'redux';
import { userReducer, UserStore } from '../modules/user/user.reducer';
import { commentReducer, CommentStore } from '../modules/comment/comment.reducer';
import { postReducer, PostStore } from '../modules/post/post.reducer';
import { friendsReducer, FriendsStore } from '../modules/friends/friends.reducer';
import { FriendWallStore, friendWallReducer } from '../modules/friend-wall/friend-wall.reducer';
import { wallReducer, WallStore } from '../modules/wall/wall.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export type EntitiesStore = CommentStore & PostStore & UserStore;

export type UIStore = FriendsStore & FriendWallStore & WallStore;

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
  friendWall: friendWallReducer,
  wall: wallReducer,
});

export const rootReducer: Reducer<ApplicationStore> = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
