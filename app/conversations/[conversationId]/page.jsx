import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import Header from './(components)/Header';
import Body from './(components)/Body';
import Form from './(components)/Form';
import getUsers from '@/app/actions/getUsers';

const page = async({ params }) => {
  const { conversationId } = params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  const users = await getUsers();

  if (!conversation) {
    return (
      <section className='lg:pl-80 h-full'>
        <div className='flex flex-col h-full'>
          <EmptyState/>
        </div>
      </section>
    )
  }

  return (
    <section className='lg:pl-80 h-full'>
      <div className='flex flex-col h-full'>
        <Header conversation={conversation} users={users}/>
        <Body initialMessages={messages}  conversation={conversation}/>
        <Form conversationId={conversationId}/>
      </div>
    </section>
  )
}

export default page