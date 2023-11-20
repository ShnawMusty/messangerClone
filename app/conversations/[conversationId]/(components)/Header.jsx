'use client'

import Avatar from '@/app/components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser'
import Link from 'next/link';
import React, { useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '@/app/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';

const Header = ({conversation, users}) => {

  
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    } 
    return isActive ? 'Active' : 'Offline'
  }, [conversation, isActive])

  return (
    <>
    <ProfileDrawer conversationData={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} users={users}/>
    <section className='flex items-center justify-between w-full px-4 py-3 sm:px-3 lg:px-6 bg-white border-b-[1px] shadow-sm'>
      <div className='flex justify-center items-center gap-3'>
        <Link href="/conversations" className='lg:hidden block text-sky-500 hover:text-sky-600 transition p-2 rounded-full hover:bg-neutral-100'>
          <HiChevronLeft size={32}/>
        </Link>
        {conversation.isGroup ? (
          <AvatarGroup users={users} />
        ) : (
          <Avatar user={otherUser}/>
        )}
        <div className='flex flex-col justify-center items-start'>
          <p>{conversation.name || otherUser.name}</p>
          <span className='text-sm font-light text-neutral-500'>{statusText}</span>
        </div>
      </div>

      <span onClick={() => setDrawerOpen(true)} className='rounded-full p-2 bg-white cursor-pointer hover:bg-neutral-100 text-sky-500 hover:text-sky-600 transition'>
        <HiEllipsisHorizontal size={32}/>
      </span>
      
    </section>
    </>
  )
}

export default Header