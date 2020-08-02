import { Comment } from './comment.types';

export enum CommentActionTypes {
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

export const commentActions = {
  loadCommentsAction,
};
