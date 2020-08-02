import { commentApi } from './comment.api';
import { store } from '../../store/store';
import { commentActions } from './comment.actions';

const loadComments = (invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isDataCached()) {
      resolve();
    } else {
      commentApi.loadComments().then(
        (comments) => {
          store.dispatch(
            commentActions.loadCommentsAction({
              comments,
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

const loadPostComments = (postId: number, invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && areCommentsCached(postId)) {
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

const isDataCached = (): boolean => {
  return Object.keys(store.getState().entities.posts.byId).length > 0;
};

const areCommentsCached = (postId: number): boolean => {
  return store.getState().entities.posts.commentIdsById[postId] !== undefined;
};

export const commentCommands = { loadComments, loadPostComments };
