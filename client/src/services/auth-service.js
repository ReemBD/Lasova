import { httpService } from './http-service';

export const authService = {
  login,
};

const BASE_URL = 'auth';
async function login(email, password) {
  const { authToken } = await httpService.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return authToken;
}
