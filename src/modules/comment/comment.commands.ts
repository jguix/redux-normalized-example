import { commentApi } from './comment.api';
import { store } from '../../store/store';
import { commentActions } from './comment.actions';

const loadComments = (): Promise<void> => {
  return new Promise((resolve, reject) => {
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
  });
};

const loadPostComments = (postId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    commentApi.loadPostComments(postId).then(
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
  });
};

export const commentCommands = { loadComments, loadPostComments };
