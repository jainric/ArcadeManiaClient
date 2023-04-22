import type { ReactChildrenProps } from "../globals";

/**
 * Auth props defining the auth state
 */
export interface AuthProps extends ReactChildrenProps {
  isAuth: boolean;
}

/**
 * Signup user type defining required values
 */
export type SignUpUserType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
};

/**
 * Auth state type defining the token
 */
export type AuthState = {
  token: string;
};
