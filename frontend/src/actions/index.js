import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  UPDATE,
  LOGIN_FAIL,
  SET_ERROR,
  GET_PROFILE,
} from "../types/types";

import {
  loginQuery,
  profileQuery,
  registerQuery,
  updateProfileQuery,
} from "../endpoint";

import setAuthToken from "../utils/setAuthToken";

export const login = (email, password) => async (dispatch) => {
  try {
    const user = await loginQuery(email, password);
    console.log(user.data.data.login);

    localStorage.setItem("token", user.data.data.login.token);

    dispatch({
      type: LOGIN,
      payload: {
        user: user.data.data.login.user,
        token: user.data.data.login.token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (email, password) => async (dispatch) => {
  try {
    const user = await registerQuery(email, password);

    localStorage.setItem("token", user.register.token);

    dispatch({
      type: SIGNUP,
      payload: {
        user: user.register.user,
        token: user.register.token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (data) => async (dispatch) => {
  console.log(data);
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const user = await updateProfileQuery({ data });
    console.log(user);
    dispatch({
      type: UPDATE,
      payload: {
        user: user.data.data.updateProfile.user,
        token: user.data.data.updateProfile.token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const user = await profileQuery();

    dispatch({
      type: GET_PROFILE,
      payload: {
        user: user.data.data.profile,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
