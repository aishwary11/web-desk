import connectDB from '@/common/utils/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userName, password, email } = await req.json();
  connectDB();
  const userSaved = await User.create({ userName, password, email });
  if (userSaved) return NextResponse.json({ msg: 'User Created' }, { status: 200 });
  else return NextResponse.json({ msg: 'User Created Failed' }, { status: 401 });
}
