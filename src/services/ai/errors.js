export class AIConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AIConfigError';
    this.statusCode = 503;
  }
}

export class AIProviderError extends Error {
  constructor(message, statusCode = 502, details = null) {
    super(message);
    this.name = 'AIProviderError';
    this.statusCode = statusCode;
    this.details = details;
  }
}
