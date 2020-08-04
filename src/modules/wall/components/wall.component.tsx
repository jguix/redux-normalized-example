import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store/store';
import { Post } from '../../post/post.types';
import { RnPost } from '../../post/components/post.component';
import { wallCommands } from '../wall.commands';

const LIMIT = 5;

export const RnWall: FC = () => {
  const posts = useSelector<ApplicationStore, Post[]>((state) => {
    const postIds = state.ui.wall.postIds;
    return postIds?.map((postId) => state.entities.posts.byId[postId]);
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const computedPage = Math.ceil(posts?.length / LIMIT) || 1;
    if (page === 1 && computedPage !== page) {
      setPage(computedPage);
    }
  }, [posts, page]);

  useEffect(() => {
    setLoading(true);
    wallCommands.loadPosts(page, LIMIT).then(
      () => setLoading(false),
      () => setError(true)
    );
  }, [page]);

  const incrementPage = () => setPage(page + 1);

  if (isError) {
    return <div>Error loading posts, please refresh page.</div>;
  }

  return (
    <>
      <h1>My Wall</h1>
      {posts?.length > 0 && (
        <div>
          <button onClick={incrementPage}>Load next 5</button>
          <hr />
        </div>
      )}
      {posts?.map((post) => (
        <RnPost key={post.id} post={post} />
      ))}
      {isLoading && <div>Loading posts...</div>}
      {posts?.length > 0 && (
        <div>
          <hr />
          <button onClick={incrementPage}>Load next 5</button>
        </div>
      )}
    </>
  );
};
