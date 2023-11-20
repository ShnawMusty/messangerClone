import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(req, {params}) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', {status: 401})
    }

    // find existing conversation
    const conversation = await client.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', {status: 400})
    };

    // find last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation)
    };

    // update seen of last message
    const updatedMessage = await client.message.update({
      where: {
        id: lastMessage.id
      },
      data: {
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
    });

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessage]
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    };

    await pusherServer.trigger(conversationId, 'message:update', updatedMessage)

    return NextResponse.json(updatedMessage);

  } catch (error) {
    console.log(error, 'ERROR_MESSAGES_SEEN');
    return new NextResponse('Internal error', {status: 500})
  }
}