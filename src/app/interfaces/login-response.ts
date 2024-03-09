export interface LoginResponse {
  accessToken: string;
  tokenType: string;
}

export interface User {
  memberId: number;
  email: string;
  password: string;
  name: string;
  age: number;
}
