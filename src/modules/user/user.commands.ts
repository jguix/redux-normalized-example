import { userApi } from './user.api';
import { store } from '../../store/store';
import { userActions } from './user.actions';

const loadUsers = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    userApi.loadUsers().then(
      (users) => {
        store.dispatch(
          userActions.loadUsersAction({
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
  });
};

const loadUser = (userId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
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
  });
};

export const userCommands = { loadUser, loadUsers };
