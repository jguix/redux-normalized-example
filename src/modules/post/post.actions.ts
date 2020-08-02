import { Post } from './post.types';
import { User } from '../user/user.types';

export enum PostActionTypes {
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

export const postActions = {
  loadPostsAction,
};
