import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

export default function Add() {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [content, setContent] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(asyncAddThread({ body: content, title, category }));
      navigate('/');
    },
    [category, content, dispatch, navigate, title],
  );

  return (
    <form className="max-w-xl mx-auto" onSubmit={onSubmit}>
      <div className="mb-5">
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Judul
          <input
            type="text"
            value={title}
            onChange={setTitle}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>

      </div>
      <div className="mb-5">
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Kategori
          <input
            type="text"
            value={category}
            onChange={setCategory}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>

      </div>
      <div>
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Body
          <div className="mb-5">
            <input
              type="text"
              value={content}
              onChange={setContent}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex w-full text-center justify-center items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>
    </form>
  );
}
