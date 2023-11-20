import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, image } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', {status: 401})
    }

    const updatedUser = await client.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name,
        image
      }
    })

    return NextResponse.json(updatedUser)

  } catch (error) {
    console.log(error, 'ERROR_SETTINGS');
    return new NextResponse('Internal error', {status: 500})
  }
}