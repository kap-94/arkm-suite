export interface ErrorDetails {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
  timestamp?: string;
  path?: string;
}

export class ErrorService {
  private static instance: ErrorService;

  private constructor() {}

  static getInstance(): ErrorService {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService();
    }
    return ErrorService.instance;
  }

  createNotFoundError(
    message: string = "Resource not found",
    details?: Record<string, any>
  ): ErrorDetails {
    return this.createError({
      code: "NOT_FOUND",
      message,
      statusCode: 404,
      details,
    });
  }

  createValidationError(
    message: string = "Validation failed",
    details?: Record<string, any>
  ): ErrorDetails {
    return this.createError({
      code: "VALIDATION_ERROR",
      message,
      statusCode: 400,
      details,
    });
  }

  createAuthenticationError(
    message: string = "Authentication failed"
  ): ErrorDetails {
    return this.createError({
      code: "AUTHENTICATION_ERROR",
      message,
      statusCode: 401,
    });
  }

  createAuthorizationError(message: string = "Not authorized"): ErrorDetails {
    return this.createError({
      code: "AUTHORIZATION_ERROR",
      message,
      statusCode: 403,
    });
  }

  createServerError(
    message: string = "Internal server error",
    details?: Record<string, any>
  ): ErrorDetails {
    return this.createError({
      code: "SERVER_ERROR",
      message,
      statusCode: 500,
      details,
    });
  }

  createExternalServiceError(
    service: string,
    message: string = "External service error",
    details?: Record<string, any>
  ): ErrorDetails {
    return this.createError({
      code: "EXTERNAL_SERVICE_ERROR",
      message: `${message} (${service})`,
      statusCode: 502,
      details: {
        ...details,
        service,
      },
    });
  }

  createError(params: {
    code: string;
    message: string;
    statusCode: number;
    details?: Record<string, any>;
    path?: string;
  }): ErrorDetails {
    return {
      code: params.code,
      message: params.message,
      statusCode: params.statusCode,
      details: params.details,
      timestamp: new Date().toISOString(),
      path: params.path,
    };
  }

  isNotFoundError(error: ErrorDetails): boolean {
    return error.code === "NOT_FOUND";
  }

  isValidationError(error: ErrorDetails): boolean {
    return error.code === "VALIDATION_ERROR";
  }

  isAuthenticationError(error: ErrorDetails): boolean {
    return error.code === "AUTHENTICATION_ERROR";
  }

  isAuthorizationError(error: ErrorDetails): boolean {
    return error.code === "AUTHORIZATION_ERROR";
  }

  isServerError(error: ErrorDetails): boolean {
    return error.code === "SERVER_ERROR";
  }

  isExternalServiceError(error: ErrorDetails): boolean {
    return error.code === "EXTERNAL_SERVICE_ERROR";
  }

  formatErrorResponse(error: ErrorDetails): Record<string, any> {
    return {
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: error.timestamp,
        path: error.path,
      },
    };
  }
}

// Factory function to create the service
export function createErrorService(): ErrorService {
  return ErrorService.getInstance();
}

// Export a default instance
export const errorService = createErrorService();
