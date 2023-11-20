'use client'

import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

const Body = ({initialMessages}) => {

  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        };

        return [...current, message]
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }

        return currentMessage;
      }) )
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
  }, [conversationId])

  return (
    <main className="flex-1 over overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox key={message.id} messageData={message} isLast={i === messages.length - 1} />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </main>
  )
}

export default Body