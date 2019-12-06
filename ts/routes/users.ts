import * as Express from 'express';

import { UserCredentials } from '../data/models';
import { basicRESTCallTemplate } from './basicRESTCallTemplate';

export const router = Express.Router();

const get = (req: Express.Request, res: Express.Response) => {
  return basicRESTCallTemplate({
    dbOperation: UserCredentials.get,
    operationFailed: (result: []) => (result.length === 0),
    operationFailureCode: 404,
    operationFailureObject: { message: 'no users found' },
    opperationSuccessCode: 200,
    operationErrorMessage: 'error getting user',
  })(req, res);
};

router.get('/', get);

export default {};
