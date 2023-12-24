import React from 'react';
import PropTypes from 'prop-types';
import CardThread from '../elements/CardThread';
import { threadItemShape } from '../../utils/propsHelper';

export default function ListThread({ threads, categoryFilter }) {
  // eslint-disable-next-line max-len
  const filteredThreads = threads.filter((thread) => (categoryFilter ? thread.category === categoryFilter : true));

  return (
    <section>
      {filteredThreads.map((thread) => (
        <CardThread key={thread.id} {...thread} />
      ))}
    </section>
  );
}

ListThread.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  categoryFilter: PropTypes.string.isRequired,
};
