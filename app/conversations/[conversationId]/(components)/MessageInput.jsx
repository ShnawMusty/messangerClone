'use client'

const MessageInput = ({id, type, register, required, placeholder, errors}) => {
  return (
    <div className="relative w-full">
      <input 
      type={type} 
      id={id} 
      autoComplete={id} 
      placeholder={placeholder} 
      {...register(id, { required })} className="w-full rounded-full py-2 px-4 bg-neutral-100 text-black font-light focus:outline-none"/>
    </div>
  )
}

export default MessageInput