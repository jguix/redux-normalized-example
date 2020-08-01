import { Comment } from './comment.types';

const loadComments = (): Promise<Comment[]> => {
  return fetch(`https://jsonplaceholder.typicode.com/comments`)
    .then((response) => response.json())
    .then((comments) => comments);
};

const loadPostComments = (postId: number): Promise<Comment[]> => {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then((response) => response.json())
    .then((comments) => comments);
};

export const commentApi = { loadComments, loadPostComments };
