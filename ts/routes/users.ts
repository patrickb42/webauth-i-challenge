import * as Express from 'express';

import { UserCredentials } from '../data/models';

export const router = Express.Router();

const get = async (req: Express.Request, res: Express.Response) => {
  try {
    const result = await UserCredentials.get();
    return ((result!.length !== 0)
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'no users found' })
    );
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'error getting users',
    });
  }
};

router.get('/', get);

export default {};
