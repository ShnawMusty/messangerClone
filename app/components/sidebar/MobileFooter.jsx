'use client'

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null
  }

  return (
    <section className="fixed bottom-0 w-full z-40 flex justify-between items-center bg-white border-t-[1px] lg:hidden">
      {routes.map(item => (
        <MobileItem key={item.label} href={item.href} active={item.active} icon={item.icon} onClick={item.onClick} />
      ))}
    </section>
  )
}

export default MobileFooter