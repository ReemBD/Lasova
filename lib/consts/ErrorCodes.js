const ErrorCodes = {
  Validation: {
    InvalidEmail: 10,
  },
};

const ErrorMessages = {
  Validation: {
    InvalidEmail: 'Invalid Email',
  },
};

const ErrorCodesMessagesMap = new Map([
  [ErrorCodes.Validation.InvalidEmail, ErrorMessages.Validation.InvalidEmail],
]);

module.exports = {
  ErrorCodes,
  ErrorMessages,
  ErrorCodesMessagesMap,
};
