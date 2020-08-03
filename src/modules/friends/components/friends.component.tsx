import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../user/user.types';
import { ApplicationStore } from '../../../store/store';
import { Link } from 'react-router-dom';
import { OrderType } from '../../shared/shared.types';
import { friendsCommands } from '../friends.commands';

const LIMIT = 5;

export const RnFriends: FC = () => {
  const order = useSelector<ApplicationStore, OrderType>((state) => {
    return state.ui.friends.orderFilter;
  });
  const friends = useSelector<ApplicationStore, User[]>((state) => {
    const userIds =
      state.ui.friends.orderFilter === 'asc' ? state.ui.friends.userIdsByOrderAsc : state.ui.friends.userIdsByOrderDesc;
    return userIds?.map((userId) => state.entities.users.byId[userId]);
  });
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(Math.ceil(friends?.length / LIMIT) || 1);
  console.log(`Initial page ${page}`);

  useEffect(() => {
    setLoading(true);
    friendsCommands.loadFriends(page, LIMIT, order).then(
      () => setLoading(false),
      () => setError(true)
    );
  }, [order, page]);

  const onOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    friendsCommands.setOrder(event.target.value as OrderType);
  };

  const incrementPage = () => setPage(page + 1);

  if (isLoading) {
    return <div>Loading friends...</div>;
  }

  if (isError) {
    return <div>Error loading friends, please refresh page.</div>;
  }

  return friends ? (
    <>
      <h1>My Friends</h1>
      {friends?.length > 0 && (
        <div>
          <span>Order: </span>
          <select onChange={onOrderChange} value={order}>
            <option value="asc">Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
          <span>&nbsp;</span>
          <button onClick={incrementPage}>Load next 5</button>
          <hr />
        </div>
      )}
      {friends.map((friend: User) => (
        <Link key={friend.id} to={`/friend/${friend.id}`}>
          <div>{friend.name}</div>
        </Link>
      ))}
      {friends?.length > 0 && (
        <div>
          <hr />
          <button onClick={incrementPage}>Load next 5</button>
        </div>
      )}
    </>
  ) : (
    <></>
  );
};
