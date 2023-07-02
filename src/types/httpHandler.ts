import http from 'http';

export type httpHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => void;

export interface GenericHttpHandler<T> {
  (req: http.IncomingMessage, res: http.ServerResponse): T;
}

export interface GenericReadBody {
  <T>(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    callback: (body: string) => T,
  ): Promise<T>;
}
