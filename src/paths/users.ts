import { httpHandler } from '../types/httpHandler';
import { getUsers } from './methods/get.users';
import { postUsers } from './methods/post.users';
import * as http from 'http';
import { putUsers } from './methods/put.users';
import { deleteUsers } from './methods/delete.users';

export type Methods = Map<string, httpHandler>;

export const usersMethods = new Map<string, httpHandler>();
usersMethods.set('GET', <httpHandler>((req, res) => getUsers(req, res)));
usersMethods.set('POST', <httpHandler>((req, res) => postUsers(req, res)));
usersMethods.set('PUT', <httpHandler>((req, res) => putUsers(req, res)));
usersMethods.set('DELETE', <httpHandler>((req, res) => deleteUsers(req, res)));
