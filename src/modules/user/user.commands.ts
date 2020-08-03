import { userApi } from './user.api';
import { store } from '../../store/store';
import { userActions } from './user.actions';

// const loadUsers = (invalidateCache: boolean = false): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     if (!invalidateCache && isDataCached()) {
//       resolve();
//     } else {
//       userApi.loadUsers().then(
//         (users) => {
//           store.dispatch(
//             userActions.loadUsersAction({
//               users,
//             })
//           );
//           resolve();
//         },
//         (error) => {
//           console.log(error);
//           reject();
//         }
//       );
//     }
//   });
// };

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

// const isDataCached = (): boolean => {
//   return Object.keys(store.getState().entities.users.byId).length > 0;
// };

const isUserCached = (userId: number): boolean => {
  return store.getState().entities.users.byId[userId] !== undefined;
};

// export const userCommands = { loadUser, loadUsers };
export const userCommands = { loadUser };
