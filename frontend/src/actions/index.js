import {
  LOGOUT,
  UPDATE_SUCCESS,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  UPDATE_REQUEST,
  UPDATE_FAILED,
  GET_PROFILE_REQUEST,
  SIGNUP_FAILED,
} from "../types/types";

import { toast } from "react-toastify";

import {
  loginQuery,
  profileQuery,
  registerQuery,
  updateLastLogin,
  updateProfileQuery,
} from "../endpoint";

import setAuthToken from "../utils/setAuthToken";

export const login = (email, password) => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGIN_REQUEST,
  });

  const toastid = toast.loading("Please wait...");

  try {
    const user = await loginQuery(email, password);

    if (user.data.data == null && user.data.errors) {
      toast.dismiss(toastid);
      toast.error(user.data.errors[0].message);
      return dispatch({
        type: LOGIN_FAILED,
        payload: user.data.errors,
      });
    }

    localStorage.setItem("token", user.data.data.login.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: user.data.data.login.user,
        token: user.data.data.login.token,
      },
    });

    await updateLastLogin();
    toast.dismiss(toastid);

    if (user.data.data.login.user.isUpdated) {
      toast.success("You are in.");
    } else {
      toast.success("You are in.");
      toast.warn("Please complete your profile");
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: [
        {
          message: "Ooops! An error has occurred",
        },
      ],
    });

    toast.dismiss(toastid);
    toast.error("Ooops! An error has occurred.");
  }
};

export const signup = (email, password) => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: SIGNUP_REQUEST,
  });

  const toastid = toast.loading("Please wait...");

  try {
    const user = await registerQuery(email, password);

    if (user.data.data == null && user.data.errors) {
      toast.dismiss(toastid);
      user.data.errors.forEach((error) => toast.error(error.message));
      return dispatch({
        type: SIGNUP_FAILED,
        payload: user.data.errors,
      });
    }

    localStorage.setItem("token", user.data.data.register.token);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: {
        user: user.data.data.register.user,
        token: user.data.data.register.token,
      },
    });

    toast.dismiss(toastid);
    toast.success("You have been successfully registered.");
    toast.warn("Please complete your profile to continue.");
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILED,
      payload: [
        {
          message: "Ooops! An error has occurred",
        },
      ],
    });

    toast.dismiss(toastid);
    toast.error("Ooops! An error has occurred.");
  }
};

export const updateUser = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_REQUEST,
  });

  const toastid = toast.loading("Please wait...");

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const user = await updateProfileQuery({ data });

    if (user.data.data == null && user.data.errors) {
      toast.dismiss(toastid);
      user.data.errors.forEach((error) => toast.error(error.message));
      return dispatch({
        type: UPDATE_FAILED,
        payload: user.data.errors,
      });
    }
    toast.dismiss(toastid);
    toast.success("Profile has been updated.");

    //dispatch(getProfile());
    document.location.href = "/profile";
  } catch (error) {
    dispatch({
      type: UPDATE_FAILED,
      payload: [
        {
          message: "Ooops! An error has occurred",
        },
      ],
    });
    toast.dismiss(toastid);
    toast.error("Ooops! An error has occurred.");
  }
};

export const getProfile = () => async (dispatch) => {
  dispatch({
    type: GET_PROFILE_REQUEST,
  });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const user = await profileQuery();

    if (user.data.data == null && user.data.errors) {
      return dispatch({
        type: GET_PROFILE_FAILED,
        payload: user.data.errors,
      });
    }

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: {
        user: user.data.data.profile,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILED,
    });

    toast.error("Ooops! An error has occurred.");
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
  });
  document.location.href = "/login";
  toast.info("You are logged out.");
};
