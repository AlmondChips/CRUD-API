import { User } from 'types/user.type';
import { v4 as uuid4 } from 'uuid';
import { dbUsers } from '../../utils/dbUsers';
import { sendError, sendJSONData } from '../../utils/customResponse';
import { httpHandler } from '../../types/httpHandler';
import { readBody } from '../../utils/readBody';

export const postUsers: httpHandler = async (req, res) => {
  const user = await readBody<User | void>(req, res, (body: string) => {
    try {
      const { username, age, hobbies } = JSON.parse(body);
      const newUser: User = {
        id: uuid4(),
        username,
        age,
        hobbies,
      };
      const emptyFields = Object.keys(newUser).filter(
        (field) => !newUser[field as keyof User],
      );
      if (emptyFields.length > 0) {
        res.statusCode = 400;
        res.end(
          `Body does not contain required fields (${emptyFields.join(', ')})`,
        );
        return;
      }
      return newUser;
    } catch (error) {
      sendError(res, 'Incorrect json format', 400);
      return;
    }
  });
  if (user) {
    dbUsers.addUsers(user);
    sendJSONData(res, user, 201);
  }
};
