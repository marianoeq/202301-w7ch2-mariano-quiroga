interface CustomError extends Error {
  statusCode: number;
  statusMessage: string;
}

export class HTTPError extends Error implements CustomError {
  constructor(
    public statusCode: number,
    public statusMessage: string,
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    //this.name es una propiedad nativa de Error.
    this.name = 'HTTPError';
  }
}
