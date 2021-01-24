import { userApi } from './user.api';
import { store } from '../../store/store';
import { userActions } from './user.actions';
import { OrderType } from '../shared/shared.types';

const loadUser = (userId: number, invalidateCache: boolean = false): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isUserDataCached(userId)) {
      resolve(getCachedUserId(userId));
    } else {
      userApi.loadUser(userId).then(
        (user) => {
          store.dispatch(
            userActions.loadUserAction({
              user,
            })
          );
          resolve(user.id);
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
  });
};

const loadUsers = (
  page: number = 1,
  limit: number = 5,
  order: OrderType = 'asc',
  invalidateCache: boolean = false
): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isUsersDataCached(page, limit, order)) {
      resolve(getCachedUserIds(page, limit, order));
    } else {
      userApi.loadUsers(page, limit, order).then(
        (users) => {
          const userIds = users.map((user) => user.id);
          store.dispatch(
            userActions.loadUsersAction({
              users,
            })
          );
          store.dispatch(
            userActions.cacheUsersAction({
              userIds,
              page,
              limit,
              order,
            })
          );
          resolve(userIds);
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
  });
};

const isUsersDataCached = (page: number, limit: number, order: OrderType): boolean =>
  getCachedUserIds(page, limit, order) !== undefined;

const isUserDataCached = (userId: number): boolean => getCachedUserId(userId) !== undefined;

const getCachedUserIds = (page: number, limit: number, order: OrderType) => {
  const usersQuery = userApi.getUsersQuery(page, limit, order);
  return store.getState().entities.users.cachedUserIds[usersQuery];
};

const getCachedUserId = (userId: number) => store.getState().entities.users.byId[userId]?.id;

export const userCommands = { loadUser, loadUsers };
