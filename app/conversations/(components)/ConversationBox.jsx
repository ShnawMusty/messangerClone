'use client'

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useOtherUser from "@/app/hooks/useOtherUser"
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

const ConversationBox = ({conversationData, selected, users}) => {
  
  const otherUser = useOtherUser(conversationData);
  const router = useRouter();
  let session = useSession();

  const lastMessage = useMemo(() => {
    const messages = conversationData.messages || [];

    return messages[messages.length - 1];
  }, [conversationData.messages]);

  const currentUserEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    };

    const seenArray = lastMessage.seen || [];

    if (!currentUserEmail) {
      return false;
    }

    return seenArray.filter(user => user.email === currentUserEmail).length !== 0;
  }, [currentUserEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }
    
    if (lastMessage?.body) {
      return lastMessage.body
    }
    
    return 'Started a conversation'
    
  }, [lastMessage])
  
  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversationData.id}`)
  }, [conversationData, router]);

  return (
    <section onClick={handleClick}
    className={clsx(`flex items-center gap-3 relative w-full rounded-lg p-3 cursor-pointer hover:bg-neutral-100 transition`,
    selected ? 'bg-neutral-100' : 'bg-white')}>
      {conversationData.isGroup ? (
        <AvatarGroup users={users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="flex-1 min-w-0">
        <span className="flex justify-between items-center mb-1">
          <p className="text-md font-medium text-gray-900">
            {conversationData?.name || otherUser?.name}
          </p>
          {lastMessage?.createdAt && (
            <p className="text-sm font-light text-gray-400">
              {format(new Date(lastMessage.createdAt), 'p')}
            </p>
          )}
        </span>
        <p 
        className={clsx(`truncate text-sm`,
        hasSeen ? 'text-gray-400' : 'text-black font-medium')}>
          {lastMessageText}
        </p>
      </div>
    </section>
  )
}

export default ConversationBox