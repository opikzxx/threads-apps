import { ActionType } from './action';

export default function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.ADD_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: [...threadDetail.comments, action.payload.comment],
      };
    case ActionType.UPVOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: [...threadDetail.upVotesBy, action.payload.userId],
        downVotesBy: threadDetail.downVotesBy.filter(
          (vote) => vote !== action.payload.userId,
        ),
      };
    case ActionType.DOWNVOTE_THREAD:
      return {
        ...threadDetail,
        downVotesBy: [...threadDetail.downVotesBy, action.payload.userId],
        upVotesBy: threadDetail.upVotesBy.filter(
          (vote) => vote !== action.payload.userId,
        ),
      };
    case ActionType.NEUTRALVOTE_THREAD:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.filter(
          (vote) => vote !== action.payload.userId,
        ),
        upVotesBy: threadDetail.upVotesBy.filter(
          (vote) => vote !== action.payload.userId,
        ),
      };

    case ActionType.UPVOTE_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: [...comment.upVotesBy, action.payload.userId],
              downVotesBy: comment.downVotesBy.filter(
                (vote) => vote !== action.payload.userId,
              ),
            };
          }
          return comment;
        }),
      };
    case ActionType.DOWNVOTE_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: [...comment.downVotesBy, action.payload.userId],
              upVotesBy: comment.upVotesBy.filter(
                (vote) => vote !== action.payload.userId,
              ),
            };
          }
          return comment;
        }),
      };
    case ActionType.NEUTRALVOTE_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: threadDetail.downVotesBy.filter(
                (vote) => vote !== action.payload.userId,
              ),
              upVotesBy: threadDetail.upVotesBy.filter(
                (vote) => vote !== action.payload.userId,
              ),
            };
          }
          return comment;
        }),
      };
    default:
      return threadDetail;
  }
}
