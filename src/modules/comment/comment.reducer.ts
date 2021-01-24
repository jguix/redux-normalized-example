import { Comment } from './comment.types';
import { CacheCommentsAction, CommentActionTypes, LoadCommentsAction } from './comment.actions';
import { NumberIndexed, StringIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { commentApi } from './comment.api';

export type CommentState = {
  byId: NumberIndexed<Comment>;
  cachedCommentIds: StringIndexed<number[]>;
};

export type CommentStore = {
  comments: CommentState;
};

export const commentByIdReducer = (state: NumberIndexed<Comment> = {}, action: AnyAction) => {
  switch (action.type) {
    case CommentActionTypes.LOAD_COMMENTS:
      const { payload } = action as LoadCommentsAction;
      const { comments } = payload;
      const loadedCommentsMap = comments.reduce((map, comment) => ({ ...map, [comment.id]: comment }), {});

      return {
        ...state,
        ...loadedCommentsMap,
      };
  }

  return state;
};

export const cachedCommentIdsReducer = (state: StringIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case CommentActionTypes.CACHE_COMMENTS:
      const { payload } = action as CacheCommentsAction;
      const { commentIds, postId } = payload;
      const commentsQuery = commentApi.getCommentsQuery(postId);

      return {
        ...state,
        [commentsQuery]: commentIds,
      };
  }

  return state;
};

export const commentReducer: Reducer<CommentState> = combineReducers({
  byId: commentByIdReducer,
  cachedCommentIds: cachedCommentIdsReducer,
});
