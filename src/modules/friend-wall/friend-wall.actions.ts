import { Post } from '../post/post.types';

export enum FriendWallActionTypes {
  LOAD_POSTS = 'FRIEND_WALL:LOAD_POSTS',
}

export type LoadFriendWallPostsPayload = {
  postIds: number[];
  userId: number;
};

export type LoadFriendWallPostsAction = {
  type: FriendWallActionTypes.LOAD_POSTS;
  payload: LoadFriendWallPostsPayload;
};

const loadFriendWallPostsAction = (payload: LoadFriendWallPostsPayload): LoadFriendWallPostsAction => {
  return {
    payload,
    type: FriendWallActionTypes.LOAD_POSTS,
  };
};

export const friendWallActions = {
  loadFriendWallPostsAction,
};
