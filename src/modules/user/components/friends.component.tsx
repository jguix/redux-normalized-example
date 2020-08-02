import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../user.types';
import { ApplicationStore } from '../../../store/store';
import { userCommands } from '../user.commands';
import { Link } from 'react-router-dom';

export const RnFriends: FC = () => {
  const users = useSelector<ApplicationStore, User[]>((state) => {
    return Object.values(state.entities.users.byId);
  });
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    userCommands.loadUsers().then(
      () => setLoading(false),
      () => setError(true)
    );
  }, []);

  if (isLoading) {
    return <div>Loading friends...</div>;
  }

  if (isError) {
    return <div>Error loading friends, please refresh page.</div>;
  }

  return users ? (
    <>
      <h1>My Friends</h1>
      {users.map((user) => (
        <Link key={user.id} to={`/friend/${user.id}`}>
          <div>{user.name}</div>
        </Link>
      ))}
    </>
  ) : (
    <></>
  );
};
