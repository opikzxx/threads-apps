import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

import Login from './pages/Login';
import Home from './pages/Home';
import Loading from './components/fragments/Loading';
import Header from './components/fragments/Header';
import Add from './pages/Add';
import DetailPage from './pages/DetailPage';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';

function App() {
  const firstRun = React.useRef(true);
  const { isPreload = false, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncPreloadProcess());
      firstRun.current = false;
    }
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return <Loading />;
  }

  return (
    <>
      <Loading />
      <main>
        {authUser === null ? (
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        ) : (
          <>
            <Header logout={onLogOut} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/thread/:id" element={<DetailPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </>
        )}
      </main>
    </>
  );
}

export default App;
