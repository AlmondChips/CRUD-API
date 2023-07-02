import * as http from 'http';
import { User } from 'types/user.type';
import { v4 as uuid4 } from 'uuid';
import { dbUsers } from '../../utils/dbUsers';
import { sendJSONData } from '../../utils/customResponse';
import { httpHandler } from '../../types/httpHandler';

export const postUsers: httpHandler = (req, res) => {
  let body = '';
  req.on('data', (data) => {
    body += data;
    if (body.length > 1e6) req.connection.destroy();
  });
  req.on('end', () => {
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
    console.log(newUser);
    dbUsers.addUsers(newUser);
    sendJSONData(res, newUser, 201);
  });
};
