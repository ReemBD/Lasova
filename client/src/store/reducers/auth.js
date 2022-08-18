import { accessTokenService } from '../../services/access-token.service';
import { storageService } from '../../services/storage.service';
import decode from 'jwt-decode';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('LASOVA_AUTH_TOKEN') || null,
  isAuthenticated: null,
  loading: true,
  user: storageService.getItem('LOGGED_IN_USER'),
};

export function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      localStorage.setItem('user', JSON.stringify(payload));
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      const user = decode(payload);
      accessTokenService.setToken(payload);
      storageService.setItem('LOGGED_IN_USER', user);
      return {
        ...state,
        user,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      accessTokenService.removeItem();
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}
