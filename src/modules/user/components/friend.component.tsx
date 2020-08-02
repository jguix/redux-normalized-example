import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../user.types';
import { ApplicationStore } from '../../../store/store';
import { userCommands } from '../user.commands';
import { useParams } from 'react-router-dom';
import { postCommands } from '../../post/post.commands';
import { Post } from '../../post/post.types';
import { RnPost } from '../../post/components/post.component';

export const RnFriend: FC = () => {
  const { id: idString } = useParams();
  const userId = idString && parseInt(idString);

  const user = useSelector<ApplicationStore, User>((state) => {
    return state.entities.users.byId[userId];
  });
  const posts = useSelector<ApplicationStore, Post[]>((state) => {
    const postIds = state.entities.users.postIdsById[userId];
    return postIds?.map((postId) => state.entities.posts.byId[postId]);
  });

  const [isLoadingUser, setLoadingUser] = useState(false);
  const [isLoadingPosts, setLoadingPosts] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoadingUser(true);
      setLoadingPosts(true);
      userCommands.loadUser(userId).then(
        () => setLoadingUser(false),
        () => setError(true)
      );
      postCommands.loadUserPosts(userId).then(
        () => setLoadingPosts(false),
        () => setError(true)
      );
    }
  }, [userId]);

  if (isError) {
    return <div>Error loading posts, please refresh page.</div>;
  }

  return user ? (
    <>
      <h1>{isLoadingUser ? 'Loading friend...' : user?.name}</h1>
      {isLoadingPosts ? 'Loading posts...' : posts?.map((post) => <RnPost key={post.id} post={post} />)}
    </>
  ) : (
    <></>
  );
};
