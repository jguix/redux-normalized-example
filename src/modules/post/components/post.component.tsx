import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Post } from '../post.types';
import { Comment } from '../../comment/comment.types';
import { ApplicationStore } from '../../../store/store';
import { commentCommands } from '../../comment/comment.commands';
import { RnComment } from '../../comment/components/comment.conponent';

type Props = {
  post: Post;
};

export const RnPost: FC<Props> = ({ post }) => {
  const comments = useSelector<ApplicationStore, Comment[]>((state) => {
    const commentIds = state.entities.posts.commentIdsById[post.id];
    return commentIds?.map((commentId) => state.entities.comments.byId[commentId]);
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    commentCommands.loadPostComments(post.id).then(
      () => setLoading(false),
      () => setError(true)
    );
  }, [post]);

  if (isError) {
    return <div>Error loading comments, please refresh page.</div>;
  }

  return post ? (
    <>
      <div>*&nbsp;{post.body}</div>

      {isLoading ? 'Loading comments...' : comments?.map((comment) => <RnComment key={comment.id} comment={comment} />)}
    </>
  ) : (
    <></>
  );
};
