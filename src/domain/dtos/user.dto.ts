export type RegisterUserDto = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export type LoginUserDto = Omit<RegisterUserDto, "firstName" | "lastName">;

export class UserDto {
  static forRegister(data: any): [error?: string, user?: RegisterUserDto] {
    const { firstName, lastName, username, password } = data;

    const erros: string[] = [];
    if (!firstName) erros.push("First name is required");
    if (!lastName) erros.push("Last name is required");
    if (!username) erros.push("Username is required");
    if (!password) erros.push("Password is required");

    if (erros.length) return [erros.join(", ")];

    const user: RegisterUserDto = {
      firstName,
      lastName,
      username,
      password,
    };

    return [undefined, user];
  }

  static forLogin(data: any): [error?: string, user?: LoginUserDto] {
    const { username, password } = data;

    const erros: string[] = [];
    if (!username) erros.push("Username is required");
    if (!password) erros.push("Password is required");

    if (erros.length) return [erros.join(", ")];

    const user: LoginUserDto = { username, password };

    return [undefined, user];
  }
}
