import { authService } from '../../services/auth-service';
import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR, LOGOUT } from './types';

export const loadUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOADED,
      payload: user
    });
  } catch (err) {
    console.log('🚀 ~ file: auth.js ~ line 14 ~ loadUser ~ err', err);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const token = await authService.login(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token
    });
    dispatch(loadUser(token));
  } catch (error) {
    console.log('🚀 ~ file: store/actions/auth.js ~ line 34 ~ login ~ error', error);
  }
};

export const logout = () => ({ type: LOGOUT });
