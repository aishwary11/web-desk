import constant from '@/utils/constant';
import db from '@/utils/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userName, password, email } = await req.json();
  const hashPassword = await bcrypt.hash(password, constant.saltRound);
  const userSaved = await db('user').insert({ userName, password: hashPassword, email });
  if (userSaved) return NextResponse.json({ msg: 'User Created' }, { status: 200 });
  else return NextResponse.json({ msg: 'User Created Failed' }, { status: 401 });
}
