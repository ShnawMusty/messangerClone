'use client'

import useRoutes from "@/app/hooks/useRoutes"
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";
import SettingsModal from "../modals/SettingsModal";

const DesktopSidebar = ({currentUser}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
    <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    <section className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col lg:justify-between lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 xl:px-6 ">
      <nav>
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map(item => (
            <DesktopItem key={item.label} label={item.label} href={item.href} icon={item.icon} active={item.active} onClick={item.onClick} />
          ))}
        </ul>
      </nav>
      <nav className="flex flex-col justify-between items-center">
        <span onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
          <Avatar user={currentUser} />
        </span>
      </nav>
    </section>
    </>
  )
}

export default DesktopSidebar