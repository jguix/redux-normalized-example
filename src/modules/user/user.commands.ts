import { userApi } from './user.api';
import { store } from '../../store/store';
import { userActions } from './user.actions';

const loadUser = (userId: number, invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isUserCached(userId)) {
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

const isUserCached = (userId: number): boolean => {
  return store.getState().entities.users.byId[userId] !== undefined;
};

export const userCommands = { loadUser };
