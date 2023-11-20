'use client'

import Image from "next/image"
import useActiveList from "../hooks/useActiveList"

const Avatar = ({user}) => {

  const { members } = useActiveList();

  const isActive = members.indexOf(user?.email) !== -1;

  return (
    <div className="relative">
      <span className="relative inline-block h-9 w-9 md:h-11 md:w-11 rounded-full overflow-hidden">
        <Image src={user?.image || '/images/placeholder.jpg'} alt="Avatar" fill className="object-cover" />
      </span>
      {isActive && (
        <span className="absolute top-0 right-0 h-2 w-2 md:h-3 md:w-3 block rounded-full ring-2 ring-white bg-green-500"/>
      )}
    </div>
  )
}

export default Avatar