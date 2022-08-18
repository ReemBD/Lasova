import { authService } from '../../services/auth-service';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './types';

// Load User
export const loadUser = (user) => async (dispatch) => {
  try {
    // const res = await api.get('/auth/login');
    dispatch({
      type: USER_LOADED,
      payload: user,
    });
  } catch (err) {
    console.log('🚀 ~ file: auth.js ~ line 14 ~ loadUser ~ err', err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  //   const body = { email, password };
  // Check if it is yulia with mongoDB
  // no token logic yet
  try {
    const token = await authService.login(email, password);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
    // dispatch(loadUser(token));
  } catch (error) {
    console.log('🚀 ~ file: auth.js ~ line 50 ~ login ~ error', error);
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
