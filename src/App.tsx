import React from 'react';
import './App.css';
import { store } from './store/store';
import { userActions } from './modules/user/user.actions';
import { User } from './modules/user/user.types';
import { Post } from './modules/post/post.types';
import { postActions } from './modules/post/post.actions';
import { Comment } from './modules/comment/comment.types';
import { commentActions } from './modules/comment/comment.actions';
import { friendsActions } from './modules/friends/friends.actions';
import { wallActions } from './modules/wall/wall.actions';
import { friendWallActions } from './modules/friend-wall/friend-wall.actions';

const users: User[] = [
  { id: 1, name: 'Josh Martin', email: 'josh.martin@gmail.com', avatar: 'http://placekitten.com/g/500/400' },
  { id: 2, name: 'Emily Matthews', email: 'emily.matthews@gmail.com', avatar: 'http://placekitten.com/g/400/400' },
  { id: 3, name: 'Sonia Lee', email: 'sonia.lee@gmail.com', avatar: 'http://placekitten.com/g/400/500' },
];
const posts: Post[] = [
  { id: 1, body: 'Blah', date: new Date(), userId: 1 },
  { id: 2, body: 'Bleh', date: new Date(), userId: 1 },
  { id: 3, body: 'Blih', date: new Date(), userId: 2 },
  { id: 4, body: 'Bloh', date: new Date(), userId: 2 },
  { id: 5, body: 'Bluh', date: new Date(), userId: 3 },
];
const comments: Comment[] = [
  { id: 1, body: 'No', date: new Date(), postId: 1, userId: 2 },
  { id: 2, body: 'Yes', date: new Date(), postId: 1, userId: 3 },
  { id: 3, body: 'Yes!', date: new Date(), postId: 1, userId: 1 },
  { id: 4, body: 'No!', date: new Date(), postId: 2, userId: 3 },
];

const App = () => {
  store.subscribe(() => {
    console.log('New state', store.getState());
  });

  console.log('Loading users');
  store.dispatch(
    userActions.loadUsersAction({
      users,
    })
  );
  console.log('Loading posts');
  store.dispatch(
    postActions.loadPostsAction({
      posts,
    })
  );
  console.log('Loading comments');
  store.dispatch(
    commentActions.loadCommentsAction({
      comments,
    })
  );
  console.log('Loading friends');
  store.dispatch(
    friendsActions.loadFriendsAction({
      users: [users[1], users[2]],
      order: 'asc',
    })
  );
  console.log('Loading wall posts');
  store.dispatch(
    wallActions.loadWallPostsAction({
      posts,
    })
  );
  console.log("Loading Emily's posts");
  store.dispatch(
    friendWallActions.loadFriendWallPostsAction({
      posts: [posts[2], posts[3]],
      userId: 2,
    })
  );

  return (
    <div className="App">
      <div>Store contents</div>
      <div>
        <pre>{JSON.stringify(store.getState(), null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
