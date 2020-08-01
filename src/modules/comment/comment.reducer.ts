import { Comment } from './comment.types';
import { CommentActionTypes, LoadCommentsAction } from './comment.actions';
import { NumberIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';

export type CommentState = {
  byId: NumberIndexed<Comment>;
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

export const commentReducer: Reducer<CommentState> = combineReducers({
  byId: commentByIdReducer,
});
