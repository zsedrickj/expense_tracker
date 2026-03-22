export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  fullname: string;
  email: string;
  password: string;
  preferredCurrency: string; // optional, default to "PHP"
}
