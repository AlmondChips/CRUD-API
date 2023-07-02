import * as dotenv from 'dotenv';
import * as http from 'http';
import { URL } from 'url';

import { apiRoute, ApiRouteType } from './paths/routes';
import { Methods } from './paths/users';
import { sendError } from './utils/customResponse';
import { httpHandler } from './types/httpHandler';

dotenv.config();

const port = process.env.PORT;
if (!port) {
  process.exit(1);
}

const server = http.createServer(<httpHandler>((req, res) => {
  const errorRequest = (errorCode = 404) => {
    sendError(res, 'Unexisting route!', errorCode);
  };
  if (!req.url) {
    errorRequest();
    return;
  }

  const pathUrl = new URL(req.url, `http://${req.headers.host}`);
  const [, ...route]: string[] = pathUrl.pathname.split('/');
  let methods: Methods;
  try {
    const result = findMethods(route);
    if (!result) throw new Error();
    methods = result;
  } catch {
    errorRequest();
    return;
  }
  const action: httpHandler = methods.get(req.method!) || unknownHttpMethod;

  action(req, res);
}));

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const unknownHttpMethod: httpHandler = (req, res) => {
  sendError(res, 'Unknown http method', 404);
};

const findMethods = (route: string[]): Methods | undefined => {
  if (route.length < 2) throw new Error();
  let array = apiRoute;

  for (const key of route) {
    if (route[route.length - 1] !== key) {
      array = array[key] as ApiRouteType;
      if (array instanceof Map) return array;
      continue;
    }
    const result = array[key] as Methods;
    return result;
  }
};
