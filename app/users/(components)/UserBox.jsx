'use client'

import Avatar from "@/app/components/Avatar"
import LoadingModal from "@/app/components/modals/LoadingModal";
import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";

const UserBox = ({userData}) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);

    await axios
    .post('/api/conversations', {
      userId: userData.id
    })
    .then((res) => router.push(`/conversations/${res.data.id}`))
    .finally(() => setIsLoading(false) );
  }, [router, userData]);


  return (
    <>
    {isLoading && (
      <LoadingModal/>
    )}
    <section onClick={handleClick} className="relative flex items-center gap-3 w-full p-3 bg-white hover:bg-neutral-100 rounded-lg cursor-pointer transition">
      <Avatar user={userData} />
      <div className="min-w-0 flex-1">
        <span className="flex items-center justify-between mb-1 focus:outline-none">
          <p className="text-sm font-medium text-gray-900">{userData.name}</p>
        </span>
      </div>
    </section>
    </>
  )
}

export default UserBox