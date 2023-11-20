'use client'

import clsx from "clsx";
import useConversation from "../hooks/useConversation"
import EmptyState from "../components/EmptyState";

const ConversationsPage = () => {

  const { isOpen } = useConversation();

  return (
    <section 
    className={clsx("lg:pl-80 lg:block h-full",
    isOpen ? 'block' : 'hidden')}>
      <EmptyState/>
    </section>
  )
}

export default ConversationsPage