import { Bcrypt } from "../../config/bcrypt";
import database from "../../config/database";
import { AuthDatasource } from "../../domain/datasource/auth.datasource";
import { AuthDto } from "../../domain/dtos/auth.dto";
import {
  type RegisterUserDto,
  type LoginUserDto,
} from "../../domain/dtos/user.dto";
import { UserEntity } from "../../domain/entityes/user.entity";
import { CustomError } from "../../helpers/errors/custom-error";

export class AuthService implements AuthDatasource {
  async verify(authDto: AuthDto): Promise<UserEntity> {
    const user = await database("users")
      .select<{
        id: number;
        username: string;
        first_name: string;
        last_name: string;
      }>(["id", "username", "first_name", "last_name"])
      .where({ id: authDto.id })
      .first();

    if (!user) throw CustomError.badRequest("User not found");

    return {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      password: "",
    };
  }
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { username } = registerUserDto;

    const existingUser = await database("users")
      .select("*")
      .where({ username })
      .first();

    if (existingUser) throw CustomError.badRequest("User already exists");

    const passwordHash = Bcrypt.hash(registerUserDto.password);

    const [id] = await database("users").insert({
      first_name: registerUserDto.firstName,
      last_name: registerUserDto.lastName,
      username: registerUserDto.username,
      password: passwordHash,
    });

    return {
      id,
      ...registerUserDto,
      password: passwordHash,
    };
  }
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await database("users")
      .select<{
        id: number;
        username: string;
        password: string;
        first_name: string;
        last_name: string;
      }>(["id", "username", "password", "first_name", "last_name"])
      .where({ username: loginUserDto.username })
      .first();

    if (!user) throw CustomError.badRequest("User not found");

    const isPasswordValid = Bcrypt.compare(
      loginUserDto.password,
      user.password
    );

    if (!isPasswordValid) throw CustomError.badRequest("Invalid password");

    return {
      id: user.id,
      username: user.username,
      password: user.password,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }
}
