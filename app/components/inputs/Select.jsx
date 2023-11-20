'use client'

import ReactSelect from "react-select"

const Select = ({label, options, onChange, value, disabled}) => {
  return (
    <section className="flex flex-col gap-2 z-[100] border-b border-gray-900/10 pb-12">
      <label className="font-medium text-gray-900 leading-6">{label}</label>
      <ReactSelect isDisabled={disabled} value={value} options={options} onChange={onChange} isMulti menuPortalTarget={document.body} 
      classNames={{ control: () => "text-base" }}
      styles={{ menuPortal: (base) => 
        ({ ...base, zIndex: 9999 }) 
      }} 
      />
      
    </section>
  )
}

export default Select