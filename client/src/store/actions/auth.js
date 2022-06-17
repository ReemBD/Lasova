import { useNavigate } from 'react-router-dom';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './types';

// Load User
export const loadUser = (email) => async (dispatch) => {
  try {
    // const res = await api.get('/auth');
    const user = { email: email, type: 'ADMIN', name: 'Yulia' };
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
    if (password === '1234' && email === 'yulia@gmail.com') {
      const token = '1234YuliaTopSecretJWT'; // res.data

      dispatch({
        type: LOGIN_SUCCESS,
        payload: token,
      });
      dispatch(loadUser(email));
      console.log('sucsess');
    } else {
      console.log('bummer');
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (error) {
    console.log('🚀 ~ file: auth.js ~ line 50 ~ login ~ error', error);
  }

  //   try {
  //     // const res = await api.post('/auth', body);
  //     // !! Change to mock response !! --------------------------:
  //     const res = '1234';

  //     dispatch({
  //       type: 'LOGIN_SUCCESS',
  //       payload: res.data,
  //     });

  //     dispatch(loadUser());
  //   } catch (err) {
  //     const errors = err.response.data.errors;

  //     if (errors) {
  //       console.log('🚀 ~ file: auth.js ~ line 19 ~ login ~ errors', errors);
  //       //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
  //     }

  //     dispatch({
  //       type: 'LOGIN_FAIL',
  //     });
  //   }
};

// Logout
export const logout = () => ({ type: LOGOUT });
