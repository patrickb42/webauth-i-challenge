import db from '../dbConfig';
import { UserCredentials } from '../../types';
import { basicModelTemplate } from './basicModelTemplate';

const model = basicModelTemplate<UserCredentials>({
  tableName: 'user_credentials',
  preprocessData: ({ username, password }) => ({
    username,
    hashed_password: password,
  }),
  processResult: ({ id, username }) => ({
    id,
    username,
  }),
});

interface GetByUsernameArg {
  username: string,
}

const getByUsername = ({ username }: GetByUsernameArg) => (db('user_credentials')
  .where('username', username)
  .first()
);

export default {
  get: model.get,
  insert: model.insert,
  getByUsername,
};
