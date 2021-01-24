import { Post } from './post.types';

const loadPosts = (page: number, limit: number, userId?: number): Promise<Post[]> => {
  return fetch(`/posts?${getPostsQuery(page, limit, userId)}`).then((response) => response.json());
};

const getPostsQuery = (page: number, limit: number, userId?: number) =>
  `_page=${page}&_limit=${limit}${userId ? `&userId=${userId}` : ''}`;

export const postApi = { getPostsQuery, loadPosts };
