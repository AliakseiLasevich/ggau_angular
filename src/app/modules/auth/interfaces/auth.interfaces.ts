export interface AuthRequestInterface {
  login: string;
  password: string;
}

export interface AuthResponseInterface {
  accessToken: string;
  refreshToken: string;
  name: string;
  lastname: string;
}
