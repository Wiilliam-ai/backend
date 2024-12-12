import { Bcrypt } from "../../config/bcrypt";
import database from "../../config/database";
import { AuthDatasource } from "../../domain/datasource/auth.datasource";
import {
  type RegisterUserDto,
  type LoginUserDto,
} from "../../domain/dtos/user.dto";
import { UserEntity } from "../../domain/entityes/user.entity";
import { CustomError } from "../../helpers/errors/custom-error";

export class AuthService implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { username } = registerUserDto;
    // database contiene la conexión a la base de datos
    // todo: usar aqui knex
    // Todo: verificar que el usuario no exista
    // Todo: encriptar la contraseña
    // Todo: guardar el usuario en la base de datos

    const existingUser = await database("users")
      .select("*")
      .where({ username })
      .first();

    if (existingUser) throw CustomError.badRequest("User already exists");

    const passwordHash = Bcrypt.hash(registerUserDto.password);

    const [id] = await database("users")
      .insert({
        ...registerUserDto,
        password: passwordHash,
      })
      .returning(["id"]);

    return {
      id,
      ...registerUserDto,
      password: passwordHash,
    };
  }
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: loginUserDto.username,
      password: loginUserDto.password,
    };
  }
}
