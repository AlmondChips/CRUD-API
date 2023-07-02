import { httpHandler } from '../../types/httpHandler';

export const deleteUsers: httpHandler = (req, res) => {
  res.end('DELETE!');
};
