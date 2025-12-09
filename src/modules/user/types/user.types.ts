export type UserCreateData = {
  name: string;
  email: string;
  password: string;
  roleId?: string;
};

export type UserUpdateData = {
  name?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  roleId?: string;
};

export type UserWithoutPassword = Omit<any, 'password'>;

