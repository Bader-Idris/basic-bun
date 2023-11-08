// import path from "path";

import { Request, Response } from 'express';
// import * as bcrypt from "bcrypt";
// import * as jwt from "jsonwebtoken";

const signUpController = async (req: Request, res: Response) => {
  // const { username, password } = req.body;

  // try {
  //   // Generate salt and hash the password
  //   const saltRounds = 12;
  //   const hashedPassword = await bcrypt.hash(password, saltRounds);
  //   // Save the hashed password to your database or perform other necessary operations

  //   // Create a JWT token
  //   const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
  //   // Set the token as a cookie
  //   res.cookie('token', token, { httpOnly: true });

  //   res.json({
  //     msg: 'Sign up successful',
  //     token,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }

  const { email, password, remember_me } = req.body;
  if (!email || !password || !remember_me) return res.status(400).send('Please provide all the required fields');
  res.json({
    email: email,
    password: password,
    KeepLogged: remember_me,
  });
};


const logInController = async (req: Request, res: Response) => {
  const { email, password, remember_me } = req.body;

  if (!email || !password || !remember_me) return res
      .status(400)
      .send(
        "Please provide all the required fields"
      );
  res.json({
    email: email,
    password: password,
    KeepLogged: remember_me,
  });
};


export {
  signUpController,
  logInController,
};



/*

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware


*/