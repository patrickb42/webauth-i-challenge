import db from '../dbConfig';
import { UserCredentials } from '../../types';
import { basicModelTemplate } from './basicModelTemplate';

const model = basicModelTemplate<UserCredentials>({
  tableName: 'user_credentials',
  preprocessData: ({ username, hashedPassword }) => ({
    username,
    hashed_password: hashedPassword,
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
  .where({ username })
  .first()
);

export default {
  get: model.get,
  insert: model.insert,
  getByUsername,
};
