import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Header({ logout }) {
  return (
    <header>
      <nav className="bg-slate-900 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="text-white self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Thread App
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <button
              type="button"
              onClick={logout}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Log Out
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          />
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};
