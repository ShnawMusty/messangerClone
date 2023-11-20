'use client'

import useConversation from '@/app/hooks/useConversation';
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox';
import GroupChatModal from '@/app/components/modals/GroupChatModal';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';
import { useRouter } from 'next/navigation';

const ConversationList = ({initialItems, users}) => {

  const session = useSession();
  const { isOpen, conversationId } = useConversation();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return
    };

    pusherClient.subscribe(pusherKey);

    const newConversationHandler = (newConversation) => {
      setItems((current) => {
        if (find(current, {id: newConversation.id})) {
          return current;
        };

        return [newConversation, ...current]
      })
    };

    const updateConversationHandler = (conversation) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }
        if (conversationId === conversation.id) {
          return currentConversation;
        }
      }))
    };

    const removeConversationHandler = (existingConversation) => {
      setItems((current) => {
        return [...current.filter((conversation) => {
          return conversation.id !== existingConversation.id
        })]
      });
      
      router.push('/conversations')
    }

    pusherClient.bind('conversation:new', newConversationHandler);
    pusherClient.bind('conversation:update', updateConversationHandler);
    pusherClient.bind('conversation:remove', removeConversationHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newConversationHandler);
      pusherClient.unbind('conversation:update', updateConversationHandler);
      pusherClient.unbind('conversation:remove', removeConversationHandler)
    };
  }, [pusherKey, conversationId, router])


  return (
    <>
    <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    <section 
    className={clsx(`fixed inset-y-0 pb-20 overflow-y-auto border-r border-gray-200 lg:pb-0 lg:left-20 lg:w-80 lg:block`,
    isOpen ? "hidden" : "block w-full left-0")}>
      <aside className="flex justify-between items-center mb-4 pt-4 px-5">
        <p className="text-2xl font-bold text-neutral-800">Messages</p>
        <span onClick={() => setIsModalOpen(true)}  className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'>
          <MdOutlineGroupAdd size={20} />
        </span>
      </aside>
      {items.map(item => (
        <ConversationBox key={item.id} conversationData={item} selected={item.id === conversationId} users={users}/>
      ))}
    </section>
    </>
  )
}

export default ConversationList