import { sign } from 'jsonwebtoken';

export function passwordCheck(pass: string) {
  const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/)
  return passwordRegex.test(pass)
}

export const createAccessToken = (user: any) => {
  return sign(
    { ...user },
    process.env.ACCESS_TOKEN_SECRET || 'tokenSecret', {
    expiresIn: '7d'
  });
};