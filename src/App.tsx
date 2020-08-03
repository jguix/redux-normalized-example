import React from 'react';
import './App.css';
import { RnFriends } from './modules/user/components/friends.component';
import { Route, Link } from 'react-router-dom';
import { RnFriend } from './modules/user/components/friend.component';
import { RnWall } from './modules/wall/components/wall.component';

const App = () => {
  return (
    <div className="App">
      <div>
        <span>
          <Link to="/">My Wall</Link>
        </span>
        <span> | </span>
        <span>
          <Link to="/friends">My Friends</Link>
        </span>
      </div>
      <Route path="/friends" component={RnFriends} />
      <Route path="/friend/:id" component={RnFriend} />
      <Route exact path="/" component={RnWall} />
    </div>
  );
};

export default App;
