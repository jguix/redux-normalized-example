import { Comment } from './comment.types';

const loadComments = (postId: number): Promise<Comment[]> => {
  return fetch(`/comments${getCommentsQuery(postId)}`).then((response) => response.json());
};

const getCommentsQuery = (postId?: number) => `${postId ? `?postId=${postId}` : ''}`;

export const commentApi = { getCommentsQuery, loadComments };
