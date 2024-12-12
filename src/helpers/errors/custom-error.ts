export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message)
  }

  /**
   *  Bad Request
   * @description Error 400 para indicar que la solicitud no es válida.
   * @param message
   * @returns
   */
  static badRequest(message: string) {
    return new CustomError(400, message)
  }

  /**
   *  Unauthorized
   * @description Error 401 para indicar que la solicitud no se ha autenticado correctamente.
   * @param message
   * @returns
   */
  static unauthorized(message: string) {
    return new CustomError(401, message)
  }

  /**
   * forbidden
   * @description Error 403 para indicar que el cliente no tiene permisos para acceder al recurso solicitado.
   * @param message
   * @returns
   */
  static forbidden(message: string) {
    return new CustomError(403, message)
  }

  /**
   * notFound
   * @description Error 404 para indicar que el recurso solicitado no se ha encontrado.
   * @param message
   * @returns
   */
  static notFound(message: string) {
    return new CustomError(404, message)
  }

  /**
   * Internal Server
   * @description Error 500 para indicar que ha ocurrido un error en el servidor.
   * @param message
   * @returns
   */
  static internalServer(message: string = 'Internal server error') {
    return new CustomError(500, message)
  }
}
