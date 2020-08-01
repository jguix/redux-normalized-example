import { Comment } from './comment.types';

const loadComments = (): Promise<Comment[]> => {
  return fetch(`/comments`).then((response) => response.json());
};

const loadPostComments = (postId: number): Promise<Comment[]> => {
  return fetch(`/comments?postId=${postId}`).then((response) => response.json());
};

export const commentApi = { loadComments, loadPostComments };
