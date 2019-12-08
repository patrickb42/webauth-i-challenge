import * as Express from 'express';
import * as Bcrypt from 'bcryptjs';

import { SALT_ROUNDS } from '../globalConstants';
import { UserCredentials } from '../data/models';

export const router = Express.Router();

const post = async (req: Express.Request, res: Express.Response) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    return (res.status(400).json({ message: 'must send username and password' }));
  }

  const hashedPassword = Bcrypt.hashSync(password, SALT_ROUNDS);

  try {
    const result = await UserCredentials.insert({ item: { username, hashedPassword } });
    return ((result)
      ? res.status(201).json(result)
      : res.status(500).json({ message: 'error registering user' })
    );
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'error registering user',
    });
  }
};

router.post('/', post);

export default {};
