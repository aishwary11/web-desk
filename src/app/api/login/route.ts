import db from '@/utils/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userName, password } = await req.json();
  const isUserVerified = await db('user')
    .select('*')
    .where(function () {
      this.where('userName', userName).orWhere('email', userName);
    });
  const checkPass = await bcrypt.compare(password, isUserVerified[0].password);
  if (checkPass) return NextResponse.json({ msg: 'Successful Login' }, { status: 200 });
  else return NextResponse.json({ msg: 'Login Failed' }, { status: 401 });
}
