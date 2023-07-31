import * as http from 'http';
import { User } from 'types/user.type';
import { dbUsers } from '../../utils/dbUsers';
import { sendJSONData, sendError } from '../../utils/customResponse';
import { getUserId } from '../../utils/getUserId';
import { httpHandler } from '../../types/httpHandler';

export const getUsers: httpHandler = (req, res) => {
  let users: User | User[] | undefined;
  let id;
  try {
    id = getUserId(req, res);
  } catch {
    return;
  }

  if (id) {
    users = dbUsers.getUsers(id);
    if (!users) {
      sendError(res, 'User does not exist', 404);
      return;
    }
  } else {
    users = dbUsers.getUsers();
  }

  sendJSONData(res, users);
};
