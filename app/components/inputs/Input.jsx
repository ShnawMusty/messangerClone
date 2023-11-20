'use client'

import clsx from "clsx"

const Input = ({id, label, type, required, disabled, register, errors}) => {
  return (
    <section>
      <label htmlFor={id} className='block text-base font-medium leading-6 text-gray-900 mb-2'>
        {label}
      </label>
      <input type={type} id={id} autoComplete={id} disabled={disabled} {...register(id, { required })}
      className={clsx(` form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 `,
      errors[id] && "focus:ring-rose-500",
      disabled && "opacity-50 cursor-not-allowed")}/>
    </section>
  )
}

export default Input