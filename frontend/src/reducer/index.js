import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  UPDATE,
  LOGIN_FAIL,
  SET_ERROR,
  GET_PROFILE,
} from "../types/types";

let initialState = {
  token: null,
  isLoggedIn: false,
  isLoading: true,
  profile: null,
};

const userReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        profile: {
          ...payload.user,
        },
        token: payload.token,
        isLoading: false,
        isLoggedIn: true,
      };
    case SIGNUP:
      return {
        ...state,
        token: payload.token,
        isLoading: false,
        isLoggedIn: true,
        profile: {
          ...payload.user,
        },
      };

    case GET_PROFILE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        profile: {
          ...payload.user,
        },
      };

    case UPDATE:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload.user,
        },
        isLoading: false,
        isLoggedIn: true,
      };

    case LOGOUT:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        profile: null,
        isLoading: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
