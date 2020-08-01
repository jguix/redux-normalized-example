import { postApi } from './post.api';
import { store } from '../../store/store';
import { postActions } from './post.actions';

const loadPosts = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    postApi.loadPosts().then(
      (posts) => {
        store.dispatch(
          postActions.loadPostsAction({
            posts,
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

const loadUserPosts = (userId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    postApi.loadUserPosts(userId).then(
      (posts) => {
        store.dispatch(
          postActions.loadPostsAction({
            posts,
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

export const postCommands = { loadPosts, loadUserPosts };
