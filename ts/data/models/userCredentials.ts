import { UserCredentials } from '../../types';
import { basicModelTemplate } from './basicModelTemplate';

export default basicModelTemplate<UserCredentials>({
  tableName: 'user_credentials',
  preprocessData: ({ username, password }) => ({
    obj: {
      username,
      hashed_password: password,
    },
  }),
  processResult: (result) => ({
    userId: result.user_id,
    username: result.username,
  }),
});
