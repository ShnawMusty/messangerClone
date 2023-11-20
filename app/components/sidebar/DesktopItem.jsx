'use client'

import clsx from "clsx"
import Link from "next/link"

const DesktopItem = ({label, href, icon: Icon, active, onClick}) => {

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  }

  return (
    <li onClick={handleClick}>
      <Link href={href} 
      className={clsx(`flex justify-center gap-x-3 group text-sm font-semibold leading-6 p-3 rounded-md text-gray-500 hover:text-black hover:bg-gray-100`,
      active && "bg-gray-100 text-black")}>
        <Icon className="h-6 w-6 shrink-0"/>
        <span className="sr-only">{label}</span>
    </Link>
    </li>
  )
}

export default DesktopItem