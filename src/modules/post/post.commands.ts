import { postApi } from './post.api';
import { store } from '../../store/store';
import { postActions } from './post.actions';

const loadPosts = (page: number = 1, limit: number = 5, invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isDataCached(page, limit)) {
      resolve();
    } else {
      postApi.loadPosts(page, limit).then(
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

const loadUserPosts = (
  userId: number,
  page: number = 1,
  limit: number = 5,
  invalidateCache: boolean = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && arePostsCached(userId)) {
      resolve();
    } else {
      postApi.loadUserPosts(userId, page, limit).then(
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

const isDataCached = (page: number, limit: number): boolean => {
  return Object.keys(store.getState().entities.posts.byId).length >= page * limit;
};

const arePostsCached = (userId: number): boolean => {
  return store.getState().entities.users.postIdsById[userId] !== undefined;
};

export const postCommands = { loadPosts, loadUserPosts };
