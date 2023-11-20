'use client'

import Avatar from "@/app/components/Avatar";
import ImageModal from "@/app/components/modals/ImageModal";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useState } from "react";

const MessageBox = ({isLast, messageData}) => {

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const session = useSession();
  const isOwn = session?.data?.user?.email === messageData?.sender?.email;

  const seenList = (messageData.seen || [])
  .filter((user) => user.email !== messageData?.sender?.email)
  .map((user) => user.name)
  .join(', ');


  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx("text-sm w-fit overflow-hidden",
  isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
  messageData.image ? "rounded-md p-0" : "rounded-full py-2 px-3")

  return (
    <section className={container}>
      <span className={avatar}>
        <Avatar user={messageData.sender} />
      </span>

      <div className={body}>

        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-500">
            {messageData.sender.name}
          </p>
          <span className="text-xs text-gray-400">
            {format(new Date(messageData.createdAt), 'p')}
          </span>
        </div>

        <article className={message}>
          <ImageModal src={messageData.image} isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} />
          {messageData.image ? (
              <Image onClick={() => setIsImageModalOpen(true)}  src={messageData.image} alt="image" width={288} height={288} className="object-cover cursor-pointer hover:scale-110 transition translate" />
          ) : (
            <p>{messageData.body}</p>
          )}
        </article>

        {isLast && isOwn && seenList.length > 0 && (
          <p className="text-sm font-light text-gray-500">
            Seen by 
            <span className="text-black font-semibold ml-1">{seenList}</span>
          </p>
        )}
      </div>
    </section>
  )
}

export default MessageBox