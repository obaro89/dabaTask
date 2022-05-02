import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGOUT,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  SET_ERROR,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
} from "../types/types";

let initialState = {
  token: null,
  isLoggedIn: false,
  isLoading: true,
  name: null,
  photo: null,
  email: null,
  phone: null,
  username: null,
  lastlogin: null,
  isUpdated: false,
  errors: [],
  updatedSuccess: false,
};

const userReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload.user,
        token: payload.token,
        isLoading: false,
        isLoggedIn: true,
        errors: [],
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isLoading: false,
        isLoggedIn: true,
        ...payload.user,
        errors: [],
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: localStorage.token,
        ...payload.user,
        errors: [],
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: localStorage.token,
        ...payload.user,
        updatedSuccess: true,
        errors: [],
      };

    case UPDATE_FAILED:
      return {
        ...state,
        isLoading: false,
        errors: payload,
        name: null,
        photo: null,
        email: null,
        phone: null,
        username: null,
        lastlogin: null,
        isUpdated: false,
      };

    case LOGOUT:
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
    case GET_PROFILE_FAILED:
      return {
        ...state,
        token: null,
        isLoading: false,
        isLoggedIn: false,
        errors: payload,
      };

    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case UPDATE_REQUEST:
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default userReducer;
