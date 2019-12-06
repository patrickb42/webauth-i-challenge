import * as Express from 'express';
import * as Bcrypt from 'bcryptjs';

import { SALT_ROUNDS } from '../globalConstants';
import { UserCredentials } from '../data/models';
import { basicRESTCallTemplate } from './basicRESTCallTemplate';

export const router = Express.Router();

const post = (req: Express.Request, res: Express.Response) => {
  const { username } = req.body;
  let { password } = req.body;

  if (username === undefined || password === undefined) {
    return (res.status(400).json({ message: 'must send username and password' }));
  }

  password = Bcrypt.hashSync(password, SALT_ROUNDS);

  return basicRESTCallTemplate({
    dbOperation: UserCredentials.insert,
    dbOperationArg: { item: { username, password } },
    operationFailed: (result) => (result === undefined),
    operationFailureCode: 500,
    operationFailureObject: { message: 'error registering user' },
    opperationSuccessCode: 201,
    operationErrorMessage: 'error registering user',
  })(req, res);
};

router.post('/', post);

export default {};
