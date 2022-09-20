import { accessTokenService } from '../../services/access-token.service';
import { storageService } from '../../services/storage.service';
import decode from 'jwt-decode';
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT } from '../actions/types';

const initialState = {
  token: accessTokenService.getToken(),
  isAuthenticated: false,
  loading: null,
  user: storageService.getItem('LOGGED_IN_USER')
};
export function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      const userData = localStorage.getItem('user');
      if (userData) {
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: JSON.parse(userData)
        };
      }

    case LOGIN_SUCCESS:
      const user = decode(payload);
      accessTokenService.setToken(payload);
      storageService.setItem('LOGGED_IN_USER', user);
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        user,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('user');
      accessTokenService.removeToken();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };

    default:
      return state;
  }
}
