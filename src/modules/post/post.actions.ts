import { Post } from "./post.types";

export enum PostActionTypes {
  LOAD_POSTS = "LOAD_POSTS",
}

export type LoadPostsPayload = {
  posts: Post[];
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