import { Comment } from './comment.types';

export enum CommentActionTypes {
  CACHE_COMMENTS = 'CACHE_COMMENTS',
  LOAD_COMMENTS = 'LOAD_COMMENTS',
}

export type LoadCommentsPayload = {
  comments: Comment[];
  postId?: number;
};

export type LoadCommentsAction = {
  type: CommentActionTypes.LOAD_COMMENTS;
  payload: LoadCommentsPayload;
};

const loadCommentsAction = (payload: LoadCommentsPayload): LoadCommentsAction => {
  return {
    payload,
    type: CommentActionTypes.LOAD_COMMENTS,
  };
};

export type CacheCommentsPayload = {
  commentIds: number[];
  postId?: number;
};

export type CacheCommentsAction = {
  type: CommentActionTypes.CACHE_COMMENTS;
  payload: CacheCommentsPayload;
};

const cacheCommentsAction = (payload: CacheCommentsPayload): CacheCommentsAction => {
  return {
    payload,
    type: CommentActionTypes.CACHE_COMMENTS,
  };
};

export const commentActions = {
  cacheCommentsAction,
  loadCommentsAction,
};
