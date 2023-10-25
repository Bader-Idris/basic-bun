import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

interface SignUpRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

const signUpController = async (req: SignUpRequest, res: Response) => {
  // const { username, password } = req.body;

  // try {
  //   // Generate salt and hash the password
  //   const saltRounds = 12;
  //   const hashedPassword = await bcrypt.hash(password, saltRounds);

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

  res.json({msg: 'dang'})
};

export { signUpController };