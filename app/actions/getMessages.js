import client from "../libs/prismadb";

const getMessages = async(conversationId) => {

  try {
    const messages = await client.message.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        conversationId: conversationId
      },
      include: {
        sender: true,
        seen: true
      }
    });

    return messages;

  } catch (error) {
    console.log(error);
    throw new Error('Failed getting messages');
  }
}

export default getMessages;