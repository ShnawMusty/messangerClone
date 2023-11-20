import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(req){
  try {
    const body = await req.json();
    
    const {message, image, conversationId} = body;

    const currentUser = await getCurrentUser();

    if (!currentUser?.email || !currentUser?.id) {
      return NextResponse.json('Unauthorized', {status: 401});
    }

    const newMessage = await client.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId
          }
        },
        sender: {
          connect: {
            id: currentUser.id
          }
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      },
      include: {
        seen: true,
        sender: true
      }
    })

    const updatedConversation = await client.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      },
    });

    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage = updatedConversation[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage]
      })
    })

    return NextResponse.json(newMessage)

  } catch (error) {
    console.log(error, 'ERROR_MESSAGES');
    throw new Error('Failed posting message');
    
  }
}