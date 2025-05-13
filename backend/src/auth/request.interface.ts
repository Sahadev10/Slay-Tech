import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // Add user property
}

// import { Request } from 'express';

// export interface AuthenticatedRequest extends Request {
//   user?: { // Use your JWT structure here
//     id: number;
//     username: string;
//     email: string;
//   };
// }
