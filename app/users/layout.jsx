import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import getUsers from '../actions/getUsers';
import UserList from './(components)/UserList';

const UsersLayout = async({children}) => {

  const users = await getUsers();

  return (
    <Sidebar>
      <div className='h-full'>
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  )
}

export default UsersLayout