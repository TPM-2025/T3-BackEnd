// Custom error class for better error handling
export class ErrorWithStatusCode extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
