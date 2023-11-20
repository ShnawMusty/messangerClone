'use client'

import clsx from "clsx";
import Link from "next/link";

const MobileItem = ({label, href, icon: Icon, active, onClick}) => {

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  }
  return (
    <Link href={href} onClick={handleClick} 
    className={clsx(`flex justify-center gap-x-3 w-full group text-sm font-semibold leading-6 p-4 text-gray-500 hover:text-black hover:bg-gray-100 `,
    active && "bg-gray-100 text-black")}>
    <Icon className="h-6 w-6"/>
    </Link>
  )
}

export default MobileItem