import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  BiLike, BiDislike, BiSolidLike, BiSolidDislike,
} from 'react-icons/bi';
import parser from 'html-react-parser';
import VoteType from '../../utils/constant';
import { asyncVoteComment } from '../../states/threadDetail/action';
import postedAt from '../../utils';

export default function CardComment({
  content,
  createdAt,
  downVotesBy,
  id,
  owner,
  upVotesBy,
  threadId,
}) {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  const totalLikes = (upVotesBy || []).length;
  const totalUnlikes = (downVotesBy || []).length;
  const isUserLikes = (upVotesBy || []).includes(authUser?.id);
  const isUserUnlikes = (downVotesBy || []).includes(authUser?.id);

  const onClickLike = useCallback(() => {
    if (authUser === null) {
      alert('Must Login for this action');
      return;
    }
    dispatch(
      asyncVoteComment({
        commentId: id,
        threadId,
        voteType: isUserLikes ? VoteType.NeutralVote : VoteType.UpVote,
      }),
    );
  }, [authUser, dispatch, id, isUserLikes, threadId]);

  const onClickDislike = useCallback(() => {
    if (authUser === null) {
      alert('Must Login for this action');
      return;
    }
    dispatch(
      asyncVoteComment({
        commentId: id,
        threadId,
        voteType: isUserUnlikes ? VoteType.NeutralVote : VoteType.DownVote,
      }),
    );
  }, [authUser, dispatch, id, isUserUnlikes, threadId]);

  return (
    <article className="flex p-2 md:p-6">
      <div className="flex-1 text-base bg-white rounded-lg dark:bg-gray-900">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={owner?.avatar}
                alt={owner?.name}
              />
              {owner?.name}
            </p>
          </div>

          <div className="flex items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time title="February 8th, 2022">{postedAt(createdAt)}</time>
            </p>
          </div>
        </div>
        <p className="text-xl text-gray-500 dark:text-gray-400">{parser(content)}</p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            onClick={onClickLike}
            className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium"
          >
            {isUserLikes ? (
              <BiSolidLike className="mr-1" />
            ) : (
              <BiLike className="mr-1" />
            )}
            {totalLikes}
          </button>
          <button
            type="button"
            onClick={onClickDislike}
            className="flex items-center text-sm text-gray-500  dark:text-gray-400 font-medium"
          >
            {isUserUnlikes ? (
              <BiSolidDislike className="mr-1" />
            ) : (
              <BiDislike className="mr-1" />
            )}
            {totalUnlikes}
          </button>
        </div>
        <div className="border-b-2 border-slate-200 mt-2" />
      </div>
    </article>
  );
}

CardComment.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
};
