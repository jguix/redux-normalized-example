import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../user/user.types';
import { ApplicationStore } from '../../../store/store';
import { Link } from 'react-router-dom';
import { OrderType } from '../../shared/shared.types';
import { friendsCommands } from '../friends.commands';
import { userCommands } from '../../user/user.commands';

const LIMIT = 5;

export const RnFriends: FC = () => {
  const order = useSelector<ApplicationStore, OrderType>((state) => {
    return state.ui.friends.orderFilter;
  });
  const friends = useSelector<ApplicationStore, User[]>((state) => {
    const userIds = state.ui.friends.userIds;
    return userIds?.map((userId) => state.entities.users.byId[userId]);
  });
  const initialPage = Math.ceil(friends?.length / LIMIT);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    if (page === 0) {
      incrementPage();
    }
  }, []);

  useEffect(() => {
    if (page !== initialPage) {
      onPageChange();
    }
  }, [initialPage, page]);

  const incrementPage = () => {
    setPage(page + 1);
  };

  const onPageChange = () => {
    setLoading(true);
    userCommands
      .loadUsers(page, LIMIT, order)
      .then((userIds) => friendsCommands.loadFriends(userIds))
      .then(
        () => setLoading(false),
        () => setError(true)
      );
  };

  const onOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    friendsCommands.setOrder(event.target.value as OrderType);
  };

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
