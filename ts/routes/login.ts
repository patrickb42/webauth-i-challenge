import * as Express from 'express';
import * as Bcrypt from 'bcryptjs';

import { UserCredentials } from '../data/models';

export const router = Express.Router();

const post = async (req: Express.Request, res: Express.Response) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    return (res.status(400).json({ message: 'must send username and password' }));
  }

  try {
    const result = await UserCredentials.getByUsername({ username });
    return (!Bcrypt.compareSync(password, result.hashed_password)
      ? res.status(403).json({ message: 'You shall not pass!' })
      : res.status(200).json({ id: result.id })
    );
  } catch (error) {
    return res.status(500).json({
      error: 'error logging in',
      message: error.message,
    });
  }
};

router.post('/', post);

export default {};
