import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  BiLike, BiDislike, BiSolidLike, BiSolidDislike,
} from 'react-icons/bi';
import { threadItemShape } from '../../utils/propsHelper';
import { asyncVoteThread } from '../../states/threads/action';
import VoteType from '../../utils/constant';
import postedAt from '../../utils';

export default function CardThread({
  id,
  authUser,
  title,
  category,
  totalComments,
  createdAt,
  upVotesBy = [],
  downVotesBy = [],
  user,
}) {
  const totalLikes = (upVotesBy || []).length;
  const totalUnlikes = (downVotesBy || []).length;
  const isUserLikes = upVotesBy.includes(authUser);
  const isUserUnlikes = downVotesBy.includes(authUser);

  const dispatch = useDispatch();

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

  return (
    <article className="flex p-2 md:p-6">
      <div className="flex-1 text-base bg-white rounded-lg dark:bg-gray-900">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
              {user?.name}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              #
              {category}
            </p>
          </div>

          <div className="flex items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time title="February 8th, 2022">{postedAt(createdAt)}</time>
            </p>
          </div>
        </div>
        <Link to={`/thread/${id}`}>
          <p className="text-xl text-gray-900 dark:text-gray-400 hover:underline">{title}</p>
        </Link>
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
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
          >
            <svg
              className="mr-1.5 w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
            {`(${totalComments})`}
            {' '}
            Reply
          </button>
        </div>
        <div className="border-b-2 border-slate-200 mt-2" />
      </div>
    </article>
  );
}

CardThread.propTypes = {
  ...threadItemShape,
};
