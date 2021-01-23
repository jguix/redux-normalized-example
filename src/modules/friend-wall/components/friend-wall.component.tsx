import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../user/user.types';
import { ApplicationStore } from '../../../store/store';
import { userCommands } from '../../user/user.commands';
import { useParams } from 'react-router-dom';
import { Post } from '../../post/post.types';
import { RnPost } from '../../post/components/post.component';
import { postCommands } from '../../post/post.commands';

const LIMIT = 5;

export const RnFriendWall: FC = () => {
  const { id: idString } = useParams<any>();
  const userId = idString && parseInt(idString);

  const user = useSelector<ApplicationStore, User>((state) => {
    return state.entities.users.byId[userId];
  });
  const posts = useSelector<ApplicationStore, Post[]>((state) => {
    const postIds = state.ui.friendWall.postIdsById[userId];
    return postIds?.map((postId) => state.entities.posts.byId[postId]);
  });

  const [isLoadingUser, setLoadingUser] = useState(false);
  const [isLoadingPosts, setLoadingPosts] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const computedPage = Math.ceil(posts?.length / LIMIT) || 1;
    if (page === 1 && computedPage !== page) {
      setPage(computedPage);
    }
  }, [posts, page]);

  useEffect(() => {
    if (userId) {
      setLoadingUser(true);
      setLoadingPosts(true);
      userCommands.loadUser(userId).then(
        () => setLoadingUser(false),
        () => setError(true)
      );
      postCommands.loadUserPosts(userId, page, LIMIT).then(
        () => setLoadingPosts(false),
        () => setError(true)
      );
    }
  }, [userId, page]);

  const incrementPage = () => setPage(page + 1);

  if (isError) {
    return <div>Error loading posts, please refresh page.</div>;
  }

  return user ? (
    <>
      <h1>{isLoadingUser ? 'Loading friend...' : user?.name}</h1>
      {posts?.length > 0 && (
        <div>
          <button onClick={incrementPage}>Load next 5</button>
          <hr />
        </div>
      )}
      {posts?.map((post) => (
        <RnPost key={post.id} post={post} />
      ))}
      {isLoadingPosts && <div>Loading posts...</div>}
      {posts?.length > 0 && (
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
