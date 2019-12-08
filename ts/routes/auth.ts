import * as Express from 'express';
import * as Bcrypt from 'bcryptjs';

import { SALT_ROUNDS } from '../globalConstants';
import { UserCredentials } from '../data/models';

export const router = Express.Router();

const register = async (req: Express.Request, res: Express.Response) => {
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


const login = async (req: Express.Request, res: Express.Response) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    return (res.status(400).json({ message: 'must send username and password' }));
  }

  try {
    const result = await UserCredentials.getByUsername({ username });
    return (Bcrypt.compareSync(password, result.hashed_password)
      ? res.status(200).json({ id: result.id })
      : res.status(403).json({ message: 'You shall not pass!' })
    );
  } catch (error) {
    return res.status(500).json({
      error: 'error logging in',
      message: error.message,
    });
  }
};


const getUsers = async (req: Express.Request, res: Express.Response) => {
  try {
    const result = await UserCredentials.get();
    return ((result?.length === 0)
      ? res.status(404).json({ message: 'no users found' })
      : res.status(200).json(result)
    );
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'error getting users',
    });
  }
};



router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
// router.get('/logout', logout);

export default {};
