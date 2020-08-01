import { Post } from './post.types';

const loadPosts = (): Promise<Post[]> => {
  return fetch(`/posts`).then((response) => response.json());
};

const loadUserPosts = (userId: number): Promise<Post[]> => {
  return fetch(`/posts?userId=${userId}`).then((response) => response.json());
};

export const postApi = { loadPosts, loadUserPosts };
