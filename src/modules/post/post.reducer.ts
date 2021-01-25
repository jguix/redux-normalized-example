import { Post } from './post.types';
import { PostActionTypes, LoadPostsAction } from './post.actions';
import { NumberIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { CommentActionTypes, LoadCommentsAction } from '../comment/comment.actions';

export type PostState = {
  byId: NumberIndexed<Post>;
  commentIdsById: NumberIndexed<number[]>; // one-to-many relation
};

export type PostStore = {
  posts: PostState;
};

export const postByIdReducer = (state: NumberIndexed<Post> = {}, action: AnyAction) => {
  switch (action.type) {
    case PostActionTypes.LOAD_POSTS:
      const { payload } = action as LoadPostsAction;
      const { posts } = payload;
      const loadedPostsMap = posts.reduce((map, post) => ({ ...map, [post.id]: post }), {});

      return {
        ...state,
        ...loadedPostsMap,
      };
  }

  return state;
};

export const commentIdsByIdReducer = (state: NumberIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case CommentActionTypes.LOAD_COMMENTS:
      const { payload } = action as LoadCommentsAction;
      const { comments, postId } = payload;
      let loadedCommentIdsByPostIdMap = comments.reduce(
        (commentIdsByPostIdMap, comment) => ({
          ...commentIdsByPostIdMap,
          [comment.postId]: commentIdsByPostIdMap[comment.postId]
            ? [...commentIdsByPostIdMap[comment.postId], comment.id]
            : [comment.id],
        }),
        {} as NumberIndexed<number[]>
      );
      if (comments.length === 0) {
        loadedCommentIdsByPostIdMap = { [postId as number]: [] };
      }

      return {
        ...state,
        ...loadedCommentIdsByPostIdMap,
      };
  }

  return state;
};

export const postReducer: Reducer<PostState> = combineReducers({
  byId: postByIdReducer,
  commentIdsById: commentIdsByIdReducer,
});
