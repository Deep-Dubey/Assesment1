import React from 'react';
import { useState, useEffect } from 'react';
import UserCard from './UserCard';

const Home = () => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsersList(data))
      .catch(e => console.log(e))
    }, []);

  return (
    <>
    <h1 className="text-3xl font-bold underline text-center m-2"> Directory </h1>
    <div id='container' className='h-full w-full flex flex-col flex-wrap justify-center items-center'>
        {usersList.map((user, index) => {
            return <UserCard key={index} user={user}/>
        })}
    </div>
    </>
  )
}

export default Home
