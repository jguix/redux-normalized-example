import { commentApi } from './comment.api';
import { store } from '../../store/store';
import { commentActions } from './comment.actions';

const loadPostComments = (postId: number, invalidateCache: boolean = false): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isCommentsDataCached(postId)) {
      resolve(getCachedCommentIds(postId));
    } else {
      commentApi.loadComments(postId).then(
        (comments) => {
          const commentIds = comments?.map((comment) => comment.id) || [];
          store.dispatch(
            commentActions.loadCommentsAction({
              comments,
              postId,
            })
          );
          store.dispatch(
            commentActions.cacheCommentsAction({
              commentIds,
              postId,
            })
          );
          resolve(commentIds);
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
  });
};

const isCommentsDataCached = (postId?: number): boolean => getCachedCommentIds(postId) !== undefined;

const getCachedCommentIds = (postId?: number) => {
  const commentsQuery = commentApi.getCommentsQuery(postId);
  return store.getState().entities.comments.cachedCommentIds[commentsQuery];
};

export const commentCommands = { loadPostComments };
