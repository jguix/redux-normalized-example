import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Comment } from '../comment.types';
import { ApplicationStore } from '../../../store/store';
import { User } from '../../user/user.types';
import { userCommands } from '../../user/user.commands';
import { Link } from 'react-router-dom';

type Props = {
  comment: Comment;
};

export const RnComment: FC<Props> = ({ comment }) => {
  const user = useSelector<ApplicationStore, User>((state) => {
    return state.entities.users.byId[comment.userId];
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    userCommands.loadUser(comment.userId).then(
      () => setLoading(false),
      () => setError(true)
    );
  }, [comment]);

  if (isError) {
    return <div>Error loading users, please refresh page.</div>;
  }

  return comment ? (
    <>
      <div>&nbsp;-&nbsp;{comment.body}</div>
      <div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        {isLoading ? (
          'Loading user...'
        ) : (
          <span>
            <Link to={`/friend/${user?.id}`}>{user?.name}</Link>
          </span>
        )}
        <span>&nbsp;</span>
        <span>[{comment?.date?.toLocaleString()}]</span>
      </div>
    </>
  ) : (
    <></>
  );
};
