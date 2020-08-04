import { wallActions } from './wall.actions';
import { store } from '../../store/store';
import { postApi } from '../post/post.api';
import { postActions } from '../post/post.actions';

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
          store.dispatch(
            wallActions.loadWallPostsAction({
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

const isDataCached = (page: number, limit: number): boolean => {
  return store.getState().ui.wall.postIds?.length >= page * limit;
};

export const wallCommands = { loadPosts };
