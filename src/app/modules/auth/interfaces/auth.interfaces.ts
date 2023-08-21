export interface AuthRequestInterface {
  login: string;
  password: string;
}

export interface AuthResponseInterface {
  access_token: TokenInterface;
  refresh_token: TokenInterface;
  name: string;
  lastname: string;
}

export interface TokenInterface {
  token: string;
  expires_in: number;
}
