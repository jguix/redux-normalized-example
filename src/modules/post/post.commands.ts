import { store } from '../../store/store';
import { postApi } from '../post/post.api';
import { postActions } from '../post/post.actions';

const loadPosts = (
  page: number = 1,
  limit: number = 5,
  userId?: number,
  invalidateCache: boolean = false
): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isPostsDataCached(page, limit, userId)) {
      resolve(getCachedPostIds(page, limit, userId));
    } else {
      postApi.loadPosts(page, limit, userId).then(
        (posts) => {
          const postIds = posts?.map((post) => post.id) || [];
          store.dispatch(
            postActions.loadPostsAction({
              posts,
              userId,
            })
          );
          store.dispatch(
            postActions.cachePostsAction({
              postIds,
              page,
              limit,
              userId,
            })
          );
          resolve(postIds);
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
  });
};

const isPostsDataCached = (page: number, limit: number, userId?: number): boolean =>
  getCachedPostIds(page, limit, userId) !== undefined;

const getCachedPostIds = (page: number, limit: number, userId?: number) => {
  const postsQuery = postApi.getPostsQuery(page, limit, userId);
  return store.getState().entities.posts.cachedPostIds[postsQuery];
};

export const postCommands = { loadPosts };
