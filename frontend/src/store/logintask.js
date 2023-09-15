import { createAction } from "@reduxjs/toolkit";

export const loginStart = createAction("LOGIN_START");
export const loginSucess = createAction("LOGIN_SUCCESS");
export const loginFailure = createAction("LOGIN_FAILURE");
export const logout = createAction("LOGOUT");

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case loginStart.type:
      return {
        user: null,
        loading: true,
        error: false,
      };

    case loginSucess.type:
      return {
        user: action.payload.user,
        loading: false,
        error: false,
      };

    case loginFailure.type:
      return {
        user: null,
        loading: false,
        error: true,
      };

    case logout.type:
      return {
        user: null,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
}
