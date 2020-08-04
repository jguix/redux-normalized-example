import { commentApi } from './comment.api';
import { store } from '../../store/store';
import { commentActions } from './comment.actions';

const loadPostComments = (postId: number, invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isDataCached(postId)) {
      resolve();
    } else {
      commentApi.loadPostComments(postId).then(
        (comments) => {
          store.dispatch(
            commentActions.loadCommentsAction({
              comments,
              postId,
            })
          );
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
  });
};

const isDataCached = (postId: number): boolean => {
  return store.getState().entities.posts.commentIdsById[postId] !== undefined;
};

export const commentCommands = { loadPostComments };
