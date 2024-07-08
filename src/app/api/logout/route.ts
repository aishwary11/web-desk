import constant from '@/common/constant';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  cookies().delete(constant.tokenName);
  return NextResponse.json({ msg: 'Logout Successful' }, { status: 200 });
}
