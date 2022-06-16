import { useNavigate } from 'react-router-dom';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    // const res = await api.get('/auth');
    const res = '1234';

    dispatch({
      type: 'USER_LOADED',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  //   let navigate = useNavigate();
  //   const body = { email, password };
  // Check if it is yulia with mongoDB
  // no token logic yet?
  // mock - change to redux actiuon later
  if (password === '1234' && email === 'yulia@gmail.com') {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: email,
    });
    console.log('sucsess');
    console.log(email);
    console.log(password);
    //   navigate('/');
  } else {
    console.log('bummer');
    console.log(email);
    console.log(password);
    dispatch({
      type: 'LOGIN_FAIL',
    });
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
export const logout = () => ({ type: 'LOGOUT' });
