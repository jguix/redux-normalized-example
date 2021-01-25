import { Post } from './post.types';
import { PostActionTypes, LoadPostsAction, CachePostsAction } from './post.actions';
import { NumberIndexed, StringIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { CommentActionTypes, LoadCommentsAction } from '../comment/comment.actions';
import { postApi } from './post.api';

export type PostState = {
  byId: NumberIndexed<Post>;
  cachedPostIds: StringIndexed<number[]>;
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

export const cachedPostIdsReducer = (state: StringIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case PostActionTypes.CACHE_POSTS:
      const { payload } = action as CachePostsAction;
      const { postIds, page, limit, userId } = payload;
      const postsQuery = postApi.getPostsQuery(page, limit, userId);

      return {
        ...state,
        [postsQuery]: postIds,
      };
  }

  return state;
};

export const commentIdsByIdReducer = (state: NumberIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case CommentActionTypes.LOAD_COMMENTS:
      const { payload } = action as LoadCommentsAction;
      const { comments, postId } = payload;
      let loadedCommentIdsbyPostIdMap = comments.reduce(
        (commentIdsbyPostIdMap, comment) => ({
          ...commentIdsbyPostIdMap,
          [comment.postId]: commentIdsbyPostIdMap[comment.postId]
            ? [...commentIdsbyPostIdMap[comment.postId], comment.id]
            : [comment.id],
        }),
        {} as NumberIndexed<number[]>
      );
      if (comments.length === 0) {
        loadedCommentIdsbyPostIdMap = { [postId as number]: [] };
      }

      return {
        ...state,
        ...loadedCommentIdsbyPostIdMap,
      };
  }

  return state;
};

export const postReducer: Reducer<PostState> = combineReducers({
  byId: postByIdReducer,
  cachedPostIds: cachedPostIdsReducer,
  commentIdsById: commentIdsByIdReducer,
});
