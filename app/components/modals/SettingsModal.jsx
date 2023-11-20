'use client'

import { useRouter } from "next/navigation"
import Modal from "./Modal"
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "../inputs/Input";
import Button from "../Button";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";

const SettingsModal = ({currentUser, isOpen, onClose}) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit, 
    setValue,
    watch, 
    reset,
    formState: {errors } } = useForm({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image
    }
  });

  const image = watch('image');

  const handleUpload = (result) => {
    setValue('image', result.info.secure_url, {shouldValidate: true})
  };

  const onSubmit = async(data) => {
    setIsLoading(true);

    await axios.post('/api/settings', data)
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong') )
    .finally(() => setIsLoading(false) );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="flex flex-col gap-12 justify-start" >
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900" >Profile</h2>
          <p className="ext-sm leading-6 text-gray-500" >Edit your public information.</p>
        </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div>
          <Input type="text" id="name" label="Name" required disabled={isLoading} register={register} errors={errors} />
        </div>

        <div className="flex flex-col gap-2 justify-center border-b border-gray-900/10 pb-8">

          <label className="block text-base font-medium leading-6 text-gray-900 mb-2">Photo</label>
          <div className="flex items-center gap-3">
            <span className="w-[48px] h-[48px] flex items-center justify-center overflow-hidden rounded-full">
              <Image alt="Avatar" src={image || currentUser?.image || '/images/placeholder.jpg'} width={48} height={48}/>
            </span>
            <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset="bo7yhlko" >
              <Button type="button" secondary disabled={isLoading} >Change</Button>
            </CldUploadButton>
          </div>

        </div>

        <div className="flex flex-row-reverse gap-4 items-center">
          <Button type="submit" disabled={isLoading} >Save</Button>
          <Button onClick={() => { reset(); onClose(); }} secondary disabled={isLoading} >Cancel</Button>
        </div>
      </form>

      </section>
    </Modal>
  )
}


export default SettingsModal