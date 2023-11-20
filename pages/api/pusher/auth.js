import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401);
  }

  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const data = {
    user_id: session?.user?.email
  }

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return res.send(authResponse)
}