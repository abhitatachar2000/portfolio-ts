import { Request, Response, NextFunction } from 'express';

export const authentication = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.status(401).set('WWW-Authenticate', 'Basic realm="Secure Area"').send('Authentication required.');
    return;
  }

  const validUsername = process.env.API_USER;
  const validPassword = process.env.API_PASSWORD;

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  console.log("Received: ", username, password);
  console.log("Actual: ", validUsername, validPassword);
  if (username !== validUsername || password !== validPassword) {
    res.status(401).send('Invalid credentials.');
    return;
  }

  next();
};
