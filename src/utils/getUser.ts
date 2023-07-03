import { User } from '../types/user.type';
import { GenericHttpHandler } from '../types/httpHandler';
import { getUserId } from './getUserId';
import { dbUsers } from './dbUsers';
import { sendError } from './customResponse';

export const getUser: GenericHttpHandler<undefined | User> = (req, res) => {
  let id;
  let user: User | undefined;
  try {
    id = getUserId(req, res);
  } catch {
    return;
  }

  if (id) {
    user = dbUsers.getUsers(id) as User;
    if (!user) {
      sendError(res, 'User does not exist', 404);
      return;
    }
  } else {
    sendError(res, 'Id was not provided', 404);
  }
  return user;
};
