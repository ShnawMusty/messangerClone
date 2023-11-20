'use client'

import axios from "axios"
import { useForm } from "react-hook-form"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"
import MessageInput from "./MessageInput"
import { CldUploadButton } from "next-cloudinary"

const Form = ({conversationId}) => {

  const { register, handleSubmit, setValue , formState: {errors} } = useForm({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit = async(data) => {
    setValue('message', '', {shouldValidate: true});
    await axios.post('/api/messages', {
      ...data,
      conversationId
    })
  };

  const handleUpload = async(result) => {
    await axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <section className="flex items-center justify-between gap-2 lg:gap-4 p-4 w-full bg-white border-t">

      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="bo7yhlko">
        <HiPhoto size={30} className="text-sky-500" />       
      </CldUploadButton>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full flex-1">
        <MessageInput id="message" type="text" register={register} placeholder="Write a message" errors={errors} required/>
        <button className="flex items-center justify-center p-2 rounded-full bg-sky-500 hover:bg-sky-600 transition text-white cursor-pointer">
          <HiPaperAirplane size={18}/>
        </button>
      </form>
    </section>
  )
}

export default Form