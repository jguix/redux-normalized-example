import { friendWallActions } from './friend-wall.actions';
import { store } from '../../store/store';
import { postApi } from '../post/post.api';
import { postActions } from '../post/post.actions';

const loadUserPosts = (
  userId: number,
  page: number = 1,
  limit: number = 5,
  invalidateCache: boolean = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isDataCached(userId, page, limit)) {
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

const isDataCached = (userId: number, page: number, limit: number): boolean => {
  return store.getState().ui.friendWall.postIdsById[userId]?.length >= page * limit;
};

export const friendWallCommands = { loadUserPosts };
