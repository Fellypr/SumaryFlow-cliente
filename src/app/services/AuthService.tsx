import { api } from "./api";

export interface AuthUser {
  id: number;
  username: string;
}
export interface AuthResponse {
  token: string;
  user: AuthUser;
  message: string;
}

type AuthCredentials = {
  userName: string;
  password: string;
};

export const authServices = {
  registerUser: async (credentials: AuthCredentials) => {
    const { data } = await api.post<AuthResponse>(
      "/Auth/register",
      credentials,
    );
    return data;
  },
  loginUser: async (credentials: AuthCredentials) => {
    const { data } = await api.post<AuthResponse>("/Auth/login", credentials);
    return data;
  },
};
