'use client'

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import useActiveList from "@/app/hooks/useActiveList";
import useOtherUser from "@/app/hooks/useOtherUser"
import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from 'react-icons/io5'

const ProfileDrawer = ({conversationData, isOpen, onClose, users}) => {

  const otherUser = useOtherUser(conversationData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email) !== -1;

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP')
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return conversationData.name || otherUser.name
  }, [conversationData.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (conversationData.isGroup) {
      return `${conversationData.users.length} members`
    };

    return isActive ? 'Active' : 'Offline';
  }, [conversationData.users]);


  return (
    <>
    <ConfirmModal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} as="div" className="relative z-50">
        <Transition.Child
        as={Fragment}
        enter="ease-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden" >
          <div className="absolute inset-0 overflow-hidden">

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none" >
        <Transition.Child
        as={Fragment}
        enter="transform transition ease-in-out duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500"
        leaveTo="translate-x-full"
        >
          <Dialog.Panel className="pointer-events-auto w-screen max-w-md" >
            <main className="flex flex-col h-full overflow-y-scroll bg-white py-6 shadow-xl">
              <div className="flex items-start justify-end h-7">
                <button onClick={onClose} type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 mr-2">
                  <IoClose size={24} aria-hidden="true"/>
                </button>
              </div>

              <section className="relative flex-1 flex flex-col items-center mt-6 px-4 sm:px-6">
                <span className="mb-2">
                  {conversationData.isGroup ? (
                    <AvatarGroup users={users}/>
                  ) : (
                    <Avatar user={otherUser}/>
                  )}
                </span>
                <p className="font-semibold text-lg">{title}</p>
                <span className="text-sm text-gray-500" >
                  {statusText}
                </span>

                <div onClick={() => setIsModalOpen(true)} className="flex flex-col items-center justify-center gap-3 my-8 cursor-pointer hover:opacity-75">
                  <span className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                    <IoTrash size={24} />
                  </span>
                  <p className="text-sm font-md text-neutral-600" >Delete</p>
                </div>

                {!conversationData.isGroup ? (
                  <section className="flex gap-2 w-full sm:flex-shrink-0 text-sm self-start">
                    <p className="font-medium text-gray-500" >Email:</p>
                    <span className="font-semibold text-black">{otherUser.email}</span>
                  </section>
                ) : (
                  <section className="flex flex-col gap-1 w-full sm:flex-shrink-0 text-sm self-start">
                    <p className="font-medium text-gray-700" >Emails:</p>
                    <span className="pl-2">
                      {conversationData.users.map((user) => (
                        <div className="flex gap-2">
                          <h2 className="text-gray-600">{user.name}:</h2>
                          <span className="text-red-800 font-medium">
                            {user.email}
                          </span>
                        </div>
                          
                      ))}
                    </span>
                  </section>
                )}
                
                {!conversationData.isGroup && (
                  <section className="flex gap-2 w-full sm:flex-shrink-0 text-sm self-stretch mt-4">
                    <p className="font-medium text-gray-500" >Joined</p>
                    <time dateTime={joinedDate} className="font-semibold text-black">{joinedDate}</time>
                  </section>
                )}
                </section>

            </main>
          </Dialog.Panel>
        </Transition.Child>
            </div>

          </div>
        </div>


      </Dialog>
    </Transition.Root>
    </>
  )
}

export default ProfileDrawer