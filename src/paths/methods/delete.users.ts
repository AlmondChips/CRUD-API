import { getUser } from '../../utils/getUser';
import { httpHandler } from '../../types/httpHandler';
import { IncomingMessage, ServerResponse } from 'http';
import { dbUsers } from '../../utils/dbUsers';
import { sendJSONData } from '../../utils/customResponse';

export const deleteUsers: httpHandler = (req, res) => {
  const user = getUser(req, res);

  if (user) {
    const deletedUser = { ...user };
    dbUsers.deleteUser(user);
    sendJSONData(res, deletedUser, 204);
    return;
  }
};
