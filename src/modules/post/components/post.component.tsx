import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Post } from '../post.types';
import { Comment } from '../../comment/comment.types';
import { ApplicationStore } from '../../../store/store';
import { commentCommands } from '../../comment/comment.commands';
import { RnComment } from '../../comment/components/comment.component';
import { User } from '../../user/user.types';
import { Link } from 'react-router-dom';
import { userCommands } from '../../user/user.commands';

type Props = {
  post: Post;
};

export const RnPost: FC<Props> = ({ post }) => {
  const user = useSelector<ApplicationStore, User>((state) => {
    return state.entities.users.byId[post.userId];
  });
  const comments = useSelector<ApplicationStore, Comment[]>((state) => {
    const commentIds = state.entities.posts.commentIdsById[post.id];
    return commentIds?.map((commentId) => state.entities.comments.byId[commentId]);
  });

  const [isLoadingUser, setLoadingUser] = useState(false);
  const [isLoadingComments, setLoadingComments] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoadingUser(true);
    setLoadingComments(true);
    userCommands.loadUser(post.userId).then(
      () => setLoadingUser(false),
      () => setError(true)
    );
    commentCommands.loadPostComments(post.id).then(
      () => setLoadingComments(false),
      () => setError(true)
    );
  }, [post]);

  if (isError) {
    return <div>Error loading post, please refresh page.</div>;
  }

  return post ? (
    <>
      <div>
        <span>*&nbsp;</span>
        {isLoadingUser ? (
          'Loading user...'
        ) : (
          <span>
            <Link to={`/friend/${user?.id}`}>{user?.name}</Link>
          </span>
        )}
        <span>&nbsp;</span>
        <span>{post.body}</span>
        <span>&nbsp;</span>
        <span>[{post?.date?.toLocaleString()}]</span>
      </div>

      {isLoadingComments
        ? 'Loading comments...'
        : comments?.map((comment) => <RnComment key={comment.id} comment={comment} />)}
      <br />
    </>
  ) : (
    <></>
  );
};
