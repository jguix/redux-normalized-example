import React from 'react';
import './App.css';
import { RnFriends } from './modules/user/components/friends.component';
import { Route } from 'react-router-dom';
import { RnFriend } from './modules/user/components/friend.component';

const App = () => {
  return (
    <div className="App">
      <Route path="/friends" component={RnFriends} />
      <Route path="/friend/:id" component={RnFriend} />
      <Route exact path="/" component={RnFriends} />
    </div>
  );
};

export default App;
