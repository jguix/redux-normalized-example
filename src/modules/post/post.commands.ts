import { store } from '../../store/store';
import { postApi } from '../post/post.api';
import { postActions } from '../post/post.actions';
import { friendWallActions } from '../friend-wall/friend-wall.actions';
import { wallActions } from '../wall/wall.actions';

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

const loadUserPosts = (
  userId: number,
  page: number = 1,
  limit: number = 5,
  invalidateCache: boolean = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isDataCachedByUser(userId, page, limit)) {
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
          store.dispatch(
            friendWallActions.loadFriendWallPostsAction({
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

const isDataCachedByUser = (userId: number, page: number, limit: number): boolean => {
  return store.getState().ui.friendWall.postIdsById[userId]?.length >= page * limit;
};

export const postCommands = { loadPosts, loadUserPosts };
