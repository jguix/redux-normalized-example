import { userApi } from './user.api';
import { store } from '../../store/store';
import { userActions } from './user.actions';
import { OrderType } from '../shared/shared.types';
import { friendsActions } from '../friends/friends.actions';

const loadUser = (userId: number, invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isUserDataCached(userId)) {
      resolve();
    } else {
      userApi.loadUser(userId).then(
        (user) => {
          store.dispatch(
            userActions.loadUserAction({
              user,
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

const loadUsers = (
  page: number = 1,
  limit: number = 5,
  order: OrderType = 'asc',
  invalidateCache: boolean = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isUsersDataCached(page, limit, order)) {
      resolve();
    } else {
      userApi.loadUsers(page, limit, order).then(
        (users) => {
          store.dispatch(
            userActions.loadUsersAction({
              users,
            })
          );
          store.dispatch(
            friendsActions.loadFriendsAction({
              users,
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

const isUsersDataCached = (page: number, limit: number, order: OrderType): boolean => {
  // if (order === 'asc') {
  //   return store.getState().ui.friends.userIdsByOrderAsc.length >= page * limit;
  // } else {
  //   return store.getState().ui.friends.userIdsByOrderDesc.length >= page * limit;
  // }
  return false;
};

const isUserDataCached = (userId: number): boolean => {
  return store.getState().entities.users.byId[userId] !== undefined;
};

export const userCommands = { loadUser, loadUsers };
