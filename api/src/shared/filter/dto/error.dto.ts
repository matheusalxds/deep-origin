type ErrorInputDTO = {
  message: string;
  statusCode: number;
};

type ErrorOutputDTO = ErrorInputDTO & { timestamp: string };

export class ErrorDTO {
  error: ErrorOutputDTO;

  constructor(params: ErrorInputDTO) {
    this.error = {
      ...params,
      timestamp: new Date().toISOString(),
    };
  }
}
