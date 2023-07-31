import { URL } from 'url';
import { sendError } from './customResponse';
import http from 'http';
import { error } from 'console';

export const getUserId = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
): string | void => {
  const str = '/users/';
  if (!req.url) throw new Error();
  const pathUrl = new URL(req.url, `http://${req.headers.host}`);
  const [, ...route]: string[] = pathUrl.pathname.split('/');
  const id = route[2];

  console.log(id);

  if (!id || id.length === 0) {
    return;
  }

  if (
    !id.match(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    )
  ) {
    sendError(res, "Invalid id's format. It should be uuid4", 400);
    throw new Error();
  }

  return id;
};
