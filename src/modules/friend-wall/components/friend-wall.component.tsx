import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../user/user.types';
import { ApplicationStore } from '../../../store/store';
import { userCommands } from '../../user/user.commands';
import { useParams } from 'react-router-dom';
import { Post } from '../../post/post.types';
import { RnPost } from '../../post/components/post.component';
import { postCommands } from '../../post/post.commands';
import { friendWallCommands } from '../friend-wall.commands';
import { setSourceMapRange } from 'typescript';

const LIMIT = 5;

export const RnFriendWall: FC = () => {
  const { id: idString } = useParams<any>();
  const userId = idString && parseInt(idString);

  const user = useSelector<ApplicationStore, User>((state) => {
    return state.entities.users.byId[userId];
  });
  const posts = useSelector<ApplicationStore, Post[]>((state) => {
    const postIds = state.ui.friendWall.postIdsById[userId];
    return postIds?.map((postId) => state.entities.posts.byId[postId]) || [];
  });
  const currentPage = Math.ceil(posts?.length / LIMIT);
  const [isLoadingUser, setLoadingUser] = useState(false);
  const [isLoadingPosts, setLoadingPosts] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState<number | undefined>(currentPage);

  useEffect(() => {
    if (userId && posts) {
      setPage(currentPage);
    }
  }, [userId]);

  useEffect(() => {
    if (page !== undefined && page === 0) {
      incrementPage();
    }
  }, [page]);

  useEffect(() => {
    if (page !== undefined && page !== currentPage) {
      onPageChange();
    }
  }, [currentPage, page]);

  const incrementPage = () => page !== undefined && setPage(currentPage + 1);

  const onPageChange = () => {
    if (userId) {
      setLoadingUser(true);
      setLoadingPosts(true);
      userCommands.loadUser(userId).then(
        () => setLoadingUser(false),
        () => setError(true)
      );
      postCommands
        .loadPosts(page, LIMIT, userId)
        .then((postIds) => friendWallCommands.loadPosts(postIds, userId))
        .then(
          () => setLoadingPosts(false),
          () => setError(true)
        );
    }
  };

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
