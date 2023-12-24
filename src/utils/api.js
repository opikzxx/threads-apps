const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function fetchWithAuth(url, options = {}) {
    const accessToken = getAccessToken();

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  async function register({ email, name, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  }

  async function getOwnProfile() {
    const response = await fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function getLeaderboard() {
    const response = await fetch(`${BASE_URL}/leaderboards`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJson;

    return leaderboards;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;

    return users;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  async function getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  }

  async function createThread({ title, body, category = '' }) {
    const response = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;

    return thread;
  }

  async function createComment({ threadId, content }) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;

    return comment;
  }

  async function voteThread({ threadId, voteType }) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/${voteType}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function voteComment({ threadId, commentId, voteType }) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/${voteType}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getLeaderboard,
    getAllThreads,
    createThread,
    voteThread,
    getThreadDetail,
    voteComment,
    createComment,
    getAllUsers,
  };
})();

export default api;
