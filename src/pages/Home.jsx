import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import asyncReceiveLeaderboards from '../states/leaderboards/action';
import CardUserActive from '../components/fragments/CardUserActive';
import ListThread from '../components/fragments/ListThread';
import Title from '../components/elements/Title';

function Home() {
  const [category, setCategory] = React.useState('');

  const firstRun = React.useRef(true);
  const {
    threads = [],
    users = [],
    leaderboards = [],
    authUser,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncPopulateUsersAndThreads());
      dispatch(asyncReceiveLeaderboards());
      firstRun.current = false;
    }
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user?.id === thread?.ownerId),
    authUser: authUser.id,
  }));

  const categoryList = useMemo(
    () => threads.map((thread) => thread.category).filter((value) => !!value),
    [threads],
  );

  const onClickCategory = React.useCallback(
    (item) => () => setCategory((prev) => (prev === item ? '' : item)),
    [],
  );

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="py-6">
          <h2 className="mb-2 font-normal text-slate-500">Kategori Populer</h2>
          {categoryList.map((item) => (
            <button
              type="button"
              key={item}
              onClick={onClickCategory(item)}
              className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  text-gray-900 rounded-lg group 
                          ${
                            category === item
                              ? ' dark:text-white focus:outline-none ring-blue-300 dark:focus:ring-blue-800'
                              : 'bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white'
                          }`}
            >
              <span
                className={`relative px-5 py-2.5 transition-all ease-in duration-75 
                              ${
                                category === item
                                  ? ' text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg'
                                  : 'bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'
                              }`}
              >
                #
                {item}
              </span>
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-6">
          <div className="md:col-span-4 border-slate-200 border-2 p-2 rounded-xl">
            <Title />
            <ListThread threads={threadList} categoryFilter={category} />
          </div>
          <div className="md:col-span-2 border-slate-200 border-2 p-2 md:ml-2 mt-2 md:mt-0 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Kelasemen Pengguna Aktif
              </h2>
            </div>
            {leaderboards.map((leaderboard) => (
              <CardUserActive key={leaderboard.id} {...leaderboard} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
