
export type UserType = "user" | "employer";

export type AuthMode = "login" | "register"

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
  loading?: boolean
  error?: string
}

export interface LoginFormData {
  email: string
  password: string
}


export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserType;
  [key: string]: any;
}

export interface RegistorProps {
  onSubmit: (data: RegistrationFormData) => Promise<void>;
  loading?: boolean;
  error?: string;
}