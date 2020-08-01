import { Post } from './post.types';

const loadPosts = (): Promise<Post[]> => {
  return fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => response.json())
    .then((posts) => posts);
};

const loadUserPosts = (userId: number): Promise<Post[]> => {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((posts) => posts);
};

export const postApi = { loadPosts, loadUserPosts };
