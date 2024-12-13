import { type AuthDto } from "../dtos/auth.dto";
import { type LoginUserDto, type RegisterUserDto } from "../dtos/user.dto";
import { type UserEntity } from "../entityes/user.entity";

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
  abstract verify(authDto: AuthDto): Promise<UserEntity>;
}
