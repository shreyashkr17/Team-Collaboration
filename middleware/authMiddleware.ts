import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel,{User} from '../Model/UserModel';

dotenv.config();

declare module 'express' {
  interface Request {
    user?:User;
  }
}

const authenticateRole: (requiredRole: string) => RequestHandler = (requiredRole) => {
  return async (req:any, res:any, next) => {
    try {
      const { token } = req.cookies;

      if (!token) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const tokenSecret = process.env.TOKEN_SECRET;

      if (!tokenSecret) {
        return res.status(500).json({ message: 'Token secret not defined in environment variables' });
      }

      const decodedToken = jwt.verify(token, tokenSecret) as { userId: string };

      const user = await UserModel.findById(decodedToken.userId);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      req.user = user;

      next();
    } catch (err) {
      console.log('Authentication error:', err);
      res.status(500).json({ message: 'Authentication failed' });
    }
  };
};

export default authenticateRole;
