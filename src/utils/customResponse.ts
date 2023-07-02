import http from 'http';

const sendJSONData = (
  res: http.ServerResponse,
  data: unknown,
  statusCode = 200,
) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
};

const sendError = (
  res: http.ServerResponse,
  error: string,
  errorCode: number,
) => {
  res.statusCode = errorCode || 400;
  res.end(error || 'There is an error');
};

export { sendError, sendJSONData };
