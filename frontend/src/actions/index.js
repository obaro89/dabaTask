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
  url,
  loginQuery,
  profileQuery,
  updateProfileQuery,
  registerQuery,
} from "../endpoint";
import axios from "axios";

import setAuthToken from "../utils/setAuthToken";

export const login = (email, password) => async (dispatch) => {
  try {
    const user = await axios({
      url,
      method: "POST",
      data: {
        query: loginQuery(email, password),
      },

      headers: {
        "Content-Type": "application/json",
      },
    });

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
    const user = await axios({
      url,
      method: "POST",
      data: {
        query: registerQuery(email, password),
      },

      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(user.data);
    localStorage.setItem("token", user.data.data.register.token);

    dispatch({
      type: SIGNUP,
      payload: {
        user: user.data.data.register.user,
        token: user.data.data.register.token,
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
    const user = await axios({
      url,
      method: "POST",
      data: {
        query: updateProfileQuery(data),
      },

      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(user.data);
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
    const user = await axios({
      url,
      method: "POST",
      data: {
        query: profileQuery(),
      },

      headers: {
        "Content-Type": "application/json",
      },
    });

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
