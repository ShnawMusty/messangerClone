import { NextResponse } from 'next/server' 
import bcrypt from 'bcrypt'
import client from '@/app/libs/prismadb';

export async function POST(req) {

  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse('Missing info', {status: 400})
    };

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await client.user.create({
      data: {
        name,
        email,
        hashedPassword
      }
    })

    return NextResponse.json(user);

  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', {status: 500})
  }
  
};