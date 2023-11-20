'use client'

import { useState } from "react"
import Button from "../Button"
import Input from "../inputs/Input"
import Modal from "./Modal"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import Select from "../inputs/Select"

const GroupChatModal = ({isOpen, onClose, users}) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register,
    handleSubmit, 
    reset,
    setValue,
    watch,
    formState: { errors }
    } = useForm({
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = watch('members');

  const resetAndClose = () => {
    reset();
    onClose();
  }

  const onSubmit = async(data) => {
    setIsLoading(true);
    await axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
    .then(() => {
      toast.success('Success');
      router.refresh();
      resetAndClose();
    })
    .catch(() => toast.error('Something went wrong.'))
    .finally(() => setIsLoading(false) );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <main className="flex flex-col gap-10">
        <section className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-gray-900 leading-7">Create a group chat</h2>
          <p className="text-sm leading-6text-gray-600">Create a chat with more than 2 people.</p>
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <section>
            <Input type="text" id="name" label="Name" required disabled={isLoading} register={register} errors={errors}/>
          </section>

          <section className="flex flex-col">
            <Select disabled={isLoading} label="Members" value={members} 
            options={users.map((user) => ({
              value: user.id,
              label: user.name
            }))}
            onChange={(value) => setValue('members', value, {shouldValidate: true})} 
            />

            <div className="flex flex-row-reverse gap-6 pt-8">
              <Button type="submit" disabled={isLoading}>Create</Button>
              <Button type='button' secondary disabled={isLoading} onClick={resetAndClose}>Cancel</Button>
            </div>

          </section>
        </form>
      </main>
    </Modal>
  )
}

export default GroupChatModal