import { readBody } from '../../utils/readBody';
import { getUserId } from '../../utils/getUserId';
import { GenericHttpHandler, httpHandler } from '../../types/httpHandler';
import { dbUsers } from '../../utils/dbUsers';
import { sendError, sendJSONData } from '../../utils/customResponse';
import { User } from '../../types/user.type';

export const putUsers: httpHandler = async (req, res) => {
  const user = getUser(req, res);
  if (!user) return;

  const updatedUser = await readBody<User>(req, res, (body) => {
    const { username, age, hobbies } = JSON.parse(body);
    const newUser: User = {
      ...user,
      ...(username !== undefined && { username }),
      ...(age !== undefined && { age }),
      ...(hobbies !== undefined && { hobbies }),
    };
    console.log(newUser);
    dbUsers.updateUser(newUser);
    return newUser as User;
  });

  sendJSONData(res, updatedUser);
};

const getUser: GenericHttpHandler<undefined | User> = (req, res) => {
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
