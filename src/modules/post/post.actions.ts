import { Post } from './post.types';

export enum PostActionTypes {
  CACHE_POSTS = 'CACHE_POSTS',
  LOAD_POSTS = 'LOAD_POSTS',
}

export type LoadPostsPayload = {
  posts: Post[];
  userId?: number;
};

export type LoadPostsAction = {
  type: PostActionTypes.LOAD_POSTS;
  payload: LoadPostsPayload;
};

const loadPostsAction = (payload: LoadPostsPayload): LoadPostsAction => {
  return {
    payload,
    type: PostActionTypes.LOAD_POSTS,
  };
};

export type CachePostsPayload = {
  postIds: number[];
  page: number;
  limit: number;
  userId?: number;
};

export type CachePostsAction = {
  type: PostActionTypes.CACHE_POSTS;
  payload: CachePostsPayload;
};

const cacheUsersAction = (payload: CachePostsPayload): CachePostsAction => {
  return {
    payload,
    type: PostActionTypes.CACHE_POSTS,
  };
};

export const postActions = {
  cacheUsersAction,
  loadPostsAction,
};
