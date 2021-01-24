import { Post } from '../post/post.types';

export enum WallActionTypes {
  LOAD_POSTS = 'WALL:LOAD_POSTS',
}

export type LoadWallPostsPayload = {
  postIds: number[];
};

export type LoadWallPostsAction = {
  type: WallActionTypes.LOAD_POSTS;
  payload: LoadWallPostsPayload;
};

const loadWallPostsAction = (payload: LoadWallPostsPayload): LoadWallPostsAction => {
  return {
    payload,
    type: WallActionTypes.LOAD_POSTS,
  };
};

export const wallActions = {
  loadWallPostsAction,
};
