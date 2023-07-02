import * as http from 'http';

export interface HttpArgs {
  req: http.IncomingMessage;
  res: http.ServerResponse;
}
