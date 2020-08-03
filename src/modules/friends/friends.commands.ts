import { friendsActions } from './friends.actions';
import { OrderType } from '../shared/shared.types';
import { store } from '../../store/store';
import { userApi } from '../user/user.api';
import { userActions } from '../user/user.actions';

const setOrder = (order: OrderType): Promise<void> => {
  return new Promise((resolve) => {
    store.dispatch(friendsActions.setFriendsOrderAction({ order }));
    resolve();
  });
};

const loadFriends = (
  page: number = 1,
  limit: number = 5,
  order: OrderType = 'asc',
  invalidateCache: boolean = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isDataCached(page, limit, order)) {
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
              order,
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

const isDataCached = (page: number, limit: number, order: OrderType): boolean => {
  if (order === 'asc') {
    return store.getState().ui.friends.userIdsByOrderAsc.length >= page * limit;
  } else {
    return store.getState().ui.friends.userIdsByOrderDesc.length >= page * limit;
  }
};

export const friendsCommands = { loadFriends, setOrder };
