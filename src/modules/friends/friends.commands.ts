import { friendsActions } from './friends.actions';
import { OrderType } from '../shared/shared.types';
import { store } from '../../store/store';

const setOrder = (order: OrderType): Promise<void> => {
  return new Promise((resolve) => {
    store.dispatch(friendsActions.setFriendsOrderAction({ order }));
    resolve();
  });
};

const loadFriends = (userIds: number[]): Promise<void> => {
  return new Promise((resolve) => {
    store.dispatch(
      friendsActions.loadFriendsAction({
        userIds,
      })
    );
    resolve();
  });
};

export const friendsCommands = { loadFriends, setOrder };
