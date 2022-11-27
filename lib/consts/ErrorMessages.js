const ErrorMessages = {
  InvalidEmail: 'Invalid Email',
  UserAlreadyExists: 'Unable to add user. User already exists',
  InvalidCredentials: 'Invalid username / email',
  NotLoggedIn: 'Unauthenticated request identified. Please login.',
  Forbidden: 'User must either login again or does not have the required permissions',
  NoProgramSupplied: 'No managed Program was supplied for signing up manager',
  DontHavePermission: 'User dont have permission for this action'
};

module.exports = {
  ErrorMessages
};
