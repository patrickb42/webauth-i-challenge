import * as Express from 'express';

export const verifyLoggedIn = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => (
  (req.session?.user)
    ? next()
    : res.status(401).json({ message: 'no user logged in' })
);

export default {};
