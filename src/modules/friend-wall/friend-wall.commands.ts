import { store } from '../../store/store';
import { friendWallActions } from './friend-wall.actions';

const loadPosts = (postIds: number[], userId: number): Promise<void> => {
  return new Promise((resolve) => {
    store.dispatch(
      friendWallActions.loadFriendWallPostsAction({
        postIds,
        userId,
      })
    );
    resolve();
  });
};

export const friendWallCommands = { loadPosts };
