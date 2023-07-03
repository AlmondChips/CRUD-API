import http from 'http';
import { GenericReadBody } from '../types/httpHandler';

export const readBody: GenericReadBody = async <T>(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  callback: (body: string) => T,
): Promise<T> => {
  return new Promise((resolve, rejects) => {
    let body = '';
    req.on('data', (data) => {
      body += data;
      if (body.length > 1e6) req.connection.destroy();
    });

    req.on('end', () => {
      try {
        console.log('called in end');

        const result = callback(body);
        resolve(result);
      } catch (error) {
        rejects(undefined);
      }
    });
  });
};
