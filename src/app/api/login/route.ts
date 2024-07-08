import constant from '@/common/constant';
import connectDB from '@/common/utils/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    connectDB();
    const { userName, password } = await req.json();
    const user = await User.findOne({ $or: [{ email: userName }, { userName }] });
    const checkPass = await bcrypt.compare(password, user.password);
    if (checkPass) {
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      const secret = new TextEncoder().encode(constant.token);
      const jwt = await new SignJWT(tokenData).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(constant.expiresIn).setSubject(user.email).sign(secret);
      const response = NextResponse.json({ msg: 'Login successful' }, { status: 200 });
      response.cookies.set(constant.tokenName, jwt, { httpOnly: true });
      return response;
    } else return NextResponse.json({ msg: 'Login Failed' }, { status: 401 });
  } catch (error: any | Error) {
    console.error(error);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
