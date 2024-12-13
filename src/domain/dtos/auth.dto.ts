export class AuthDto {
  constructor(public readonly id: number) {}

  static check(data: any): [error?: string, auth?: AuthDto] {
    const { id } = data.payload;
    if (!id) return ["Id is required"];
    return [undefined, new AuthDto(id)];
  }
}
