const initialState = {
  //   token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  //   email: null,
  type: null,
};

export function authReducer(state = initialState, action) {
  const { type, payload } = action;
  //   console.log('🚀 ~ file: auth.js ~ line 13 ~ authReducer ~ payload', payload);

  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        // ...payload,
        user: { ...state.user, email: payload },
        // email: payload,
        isAuthenticated: true,
        type: 'ADMIN',
        loading: false,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
