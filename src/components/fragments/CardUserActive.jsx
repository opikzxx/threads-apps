import React from 'react';
import PropTypes from 'prop-types';
import { ownerShapes } from '../../utils/propsHelper';

export default function CardUserActive({ score, user }) {
  return (
    <div className="flex justify-between items-center mb-2 px-2 md:px-6">
      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
        <img
          className="mr-2 w-6 h-6 rounded-full"
          src={user.avatar}
          alt="Michael Gough"
        />
        {user.name}
      </p>
      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
        {score}
        {' '}
        Poin
      </p>
    </div>
  );
}

CardUserActive.propTypes = {
  score: PropTypes.number.isRequired,
  user: PropTypes.shape(ownerShapes).isRequired,
};
