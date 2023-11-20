'use client'

import UserBox from "./UserBox"

const UserList = ({users}) => {


  return (
    <section className="fixed inset-y-0 block left-0 w-full pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 ">
      <aside className="px-5">
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-neutral-800 py-4">
            People
          </p>
        </div>
        {users.map((user) => (
          <UserBox key={user.id} userData={user}/>
        ))}
      </aside>
    </section>
  )
}

export default UserList