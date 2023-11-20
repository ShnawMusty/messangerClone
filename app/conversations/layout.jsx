import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import ConversationList from './(components)/ConversationList'
import getConversations from '../actions/getConversations'
import AuthContext from '../context/AuthContext'
import getUsers from '../actions/getUsers'

const ConversationsLayout = async({children}) => {

  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <AuthContext>
      <Sidebar>
        <ConversationList initialItems={conversations} users={users} />
        <div className='h-full'>
          {children}
        </div>
      </Sidebar>
    </AuthContext>

  )
}

export default ConversationsLayout