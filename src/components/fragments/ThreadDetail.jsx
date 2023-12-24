import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  BiLike, BiDislike, BiSolidLike, BiSolidDislike,
} from 'react-icons/bi';
import parser from 'html-react-parser';
import postedAt from '../../utils';
import { ownerShapes } from '../../utils/propsHelper';

export default function ThreadDetail({
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  like,
  unlike,
}) {
  const { threadDetail = null, authUser } = useSelector((state) => state);

  const isUserLikes = React.useMemo(
    () => (threadDetail?.upVotesBy || []).includes(authUser?.id),
    [authUser?.id, threadDetail?.upVotesBy],
  );
  const isUserUnlikes = React.useMemo(
    () => (threadDetail?.downVotesBy || []).includes(authUser?.id),
    [authUser?.id, threadDetail?.downVotesBy],
  );
  const totalLikes = upVotesBy.length;
  const totalUnlikes = downVotesBy.length;

  return (
    <article className="flex p-2 md:p-6">
      <div className="flex-1 text-base bg-white rounded-lg dark:bg-gray-900">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
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
        <Link to="/thread/">
          <p className="text-2xl font-semibold text-black dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl dark:text-gray-400">{parser(body)}</p>
        </Link>
        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            onClick={like}
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
            onClick={unlike}
            className="flex items-center text-sm text-gray-500  dark:text-gray-400 font-medium"
          >
            {isUserUnlikes ? (
              <BiSolidDislike className="mr-1" />
            ) : (
              <BiDislike className="mr-1" />
            )}
            {totalUnlikes}
          </button>
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white ">
            Dibuat oleh
            <img
              className="mr-2 ml-2 w-6 h-6 rounded-full"
              src={owner.avatar}
              alt={owner.name}
            />
            {owner.name}
          </p>
        </div>
      </div>
    </article>
  );
}

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(ownerShapes).isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
};
