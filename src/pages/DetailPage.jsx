/* eslint-disable no-alert */
import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormComment from '../components/fragments/FormComment';
import ThreadDetail from '../components/fragments/ThreadDetail';
import VoteType from '../utils/constant';
import {
  asyncAddCommentThreadDetail,
  asyncReceiveThreadDetail,
  asyncVoteThread,
} from '../states/threadDetail/action';
import CardComment from '../components/elements/CardComment';

export default function DetailPage() {
  const firstRun = React.useRef(true);
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onAddComment = useCallback(
    (content) => {
      dispatch(asyncAddCommentThreadDetail({ content, threadId: id }));
    },
    [dispatch, id],
  );

  const isUserLikes = React.useMemo(
    () => (threadDetail?.upVotesBy || []).includes(authUser?.id),
    [authUser?.id, threadDetail?.upVotesBy],
  );
  const isUserUnlikes = React.useMemo(
    () => (threadDetail?.downVotesBy || []).includes(authUser?.id),
    [authUser?.id, threadDetail?.downVotesBy],
  );

  const onClickLike = useCallback(() => {
    if (authUser) {
      dispatch(
        asyncVoteThread({
          threadId: id,
          voteType: isUserLikes ? VoteType.NeutralVote : VoteType.UpVote,
        }),
      );
    } else {
      alert('Must Login for this action');
    }
  }, [dispatch, id, isUserLikes, authUser]);

  const onClickDislike = useCallback(() => {
    if (authUser) {
      dispatch(
        asyncVoteThread({
          threadId: id,
          voteType: isUserUnlikes ? VoteType.NeutralVote : VoteType.DownVote,
        }),
      );
    } else {
      alert('Must Login for this action');
    }
  }, [dispatch, id, isUserUnlikes, authUser]);

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncReceiveThreadDetail(id));
      firstRun.current = false;
    }
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="border-2 p-2 rounded-xl">
          <ThreadDetail
            {...threadDetail}
            like={onClickLike}
            unlike={onClickDislike}
          />
          <FormComment onComment={onAddComment} />
          {threadDetail.comments.map((comment) => (
            <CardComment key={comment.id} {...comment} threadId={id} />
          ))}
        </div>
      </div>
    </section>
  );
}
