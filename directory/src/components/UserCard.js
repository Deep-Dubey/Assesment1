import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({user}) => {
  return (
    <Link 
      to={`/user/${user.id}`}
      state={{ userObject : user }} 
      className='w-3/4 xl:w-2/3 bg-slate-100 rounded-md py-4 px-8 flex justify-between m-2 cursor-pointer'>
      <span> {user.name} </span>
      <span> Posts : 12 </span>
    </Link>
  )
}

export default UserCard;
