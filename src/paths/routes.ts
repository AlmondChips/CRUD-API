import { usersMethods } from './users';
import { Methods } from './users';

export interface ApiRouteType {
  [key: string]: ApiRouteType | Methods;
}

export const apiRoute: ApiRouteType = {
  api: {
    users: usersMethods,
  },
};
