import { type LoginUserDto, type RegisterUserDto } from "../dtos/user.dto";

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
