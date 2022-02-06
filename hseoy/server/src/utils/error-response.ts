interface ErrorResponseProps {
  statusCode: number;
  message: string;
}

class ErrorResponse extends Error {
  isOperational: boolean;

  statusCode: number;

  stacks?: string;

  constructor({ message, statusCode }: ErrorResponseProps) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);

    this.stacks = this.stack;
  }
}

export default ErrorResponse;
