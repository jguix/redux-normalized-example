import { Post } from './post.types';

const loadPosts = (page: number, limit: number): Promise<Post[]> => {
  return fetch(`/posts?_page=${page}&_limit=${limit}`).then((response) => response.json());
};

const loadUserPosts = (userId: number, page: number, limit: number): Promise<Post[]> => {
  return fetch(`/posts?userId=${userId}&_page=${page}&_limit=${limit}`).then((response) => response.json());
};

export const postApi = { loadPosts, loadUserPosts };
