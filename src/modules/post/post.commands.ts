import { postApi } from './post.api';
import { store } from '../../store/store';
import { postActions } from './post.actions';

const loadPosts = (invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isDataCached()) {
      resolve();
    } else {
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
    }
  });
};

const loadUserPosts = (userId: number, invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && arePostsCached(userId)) {
      resolve();
    } else {
      postApi.loadUserPosts(userId).then(
        (posts) => {
          store.dispatch(
            postActions.loadPostsAction({
              posts,
              userId,
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

const arePostsCached = (userId: number): boolean => {
  return store.getState().entities.users.postIdsById[userId] !== undefined;
};

export const postCommands = { loadPosts, loadUserPosts };
