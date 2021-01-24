import { store } from '../../store/store';
import { wallActions } from './wall.actions';

const loadPosts = (postIds: number[]): Promise<void> => {
  return new Promise((resolve) => {
    store.dispatch(
      wallActions.loadWallPostsAction({
        postIds,
      })
    );
    resolve();
  });
};

export const wallCommands = { loadPosts };
