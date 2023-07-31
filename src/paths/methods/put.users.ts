import { readBody } from '../../utils/readBody';
import { getUserId } from '../../utils/getUserId';
import { GenericHttpHandler, httpHandler } from '../../types/httpHandler';
import { dbUsers } from '../../utils/dbUsers';
import { sendError, sendJSONData } from '../../utils/customResponse';
import { User } from '../../types/user.type';
import { getUser } from '../../utils/getUser';

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
