import { friendsActions } from './friends.actions';
import { OrderType } from '../shared/shared.types';
import { store } from '../../store/store';

const setOrder = (order: OrderType): Promise<void> => {
  return new Promise((resolve) => {
    store.dispatch(friendsActions.setFriendsOrderAction({ order }));
    resolve();
  });
};

export const friendsCommands = { setOrder };
