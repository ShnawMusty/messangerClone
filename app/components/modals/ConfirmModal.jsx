'use client'

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { FiAlertTriangle } from 'react-icons/fi'
import { Dialog } from "@headlessui/react";
import Button from "../Button";

const ConfirmModal = ({isOpen, onClose, children}) => {

  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async() => {
    setIsLoading(true);
    await axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      toast.success('Success')
      onClose();
      router.push('/conversations');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong')
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [conversationId, router, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="sm:flex sm:items-start">
        <span className="flex items-center justify-center rounded-full w-12 h-12 flex-shrink-0 bg-red-100 mx-auto sm:mx-0 sm:w-10 sm:h-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </span>
        
        <div className="text-center mt-3 sm:text-left sm:ml-4 sm:mt-0">
          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900" >
            Delete conversation
          </Dialog.Title>
          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete this conversation? This action cannot be undone
          </p>
        </div>

      </section>

      <div className="mt-6 sm:mt-5 sm:flex sm:gap-3 sm:flex-row-reverse">
        <Button type="button" danger disabled={isLoading} onClick={onDelete}>Delete</Button>
        <Button type="button" secondary disabled={isLoading} onClick={onClose} >Cancel</Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal