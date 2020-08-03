import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store/store';
import { postCommands } from '../../post/post.commands';
import { Post } from '../../post/post.types';
import { RnPost } from '../../post/components/post.component';

export const RnWall: FC = () => {
  const posts = useSelector<ApplicationStore, Post[]>((state) => {
    return Object.values(state.entities.posts.byId);
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    postCommands.loadPosts(page).then(
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
