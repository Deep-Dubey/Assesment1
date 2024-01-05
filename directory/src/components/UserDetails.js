import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import PostCard from './PostCard';

const UserDetails = () => {
  const [ userPosts, setUserPosts ] = useState();
  const [ countries, setCountries ] = useState([]);
  const [ selectedCountry, setSelectedCountry ] = useState('');
  const [ time, setTime ] = useState('');
  const [ isClockRunning, setIsClockRunning ] = useState(false);

  const id = useParams();
  const location = useLocation();
  const { userObject } = location.state || {};
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
      const arr = data.filter((obj) => obj.userId == id.id);
      setUserPosts(arr);      
    })
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    // Fetch data from the country API
      fetch('https://worldtimeapi.org/api/timezone')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error('Error fetching countries:', err))
  }, []);

  useEffect(() => {
    // If country is selected, select time acc to country
    if(selectedCountry && isClockRunning){
      const fetchData = () => {
        fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
        .then(response => response.json())
        .then((data) => {
          const time = new Date(data.utc_datetime);
          const hours = time.getHours().toString().padStart(2, '0');
          const minutes = time.getMinutes().toString().padStart(2, '0');
          const seconds = time.getSeconds().toString().padStart(2, '0');
          setTime(`${hours} : ${minutes} : ${seconds}`);
        })
        .catch(err => console.log(err))
      }
      // Fetch data initially
      fetchData();

      const intervalId = setInterval(fetchData, 1000);
      return () => clearInterval(intervalId);
    }
  }, [selectedCountry, isClockRunning])

  const handleCountryChange = (event) => {
    setIsClockRunning(!isClockRunning);
    setSelectedCountry(event.target.value);
  };

  function handleBtnClick(){
    setIsClockRunning(!isClockRunning);
  }

  return (
    <div>
      <div className='flex flex-col lg:flex-row lg:m-2 lg:justify-between'>
        <div className='m-2 lg:m-0'> <Link to='/' className='px-2 py-0 border-2 border-slate-600'> Back </Link> </div>
        <div className='md:flex md:justify-between'>
          {/* Country dropdown */}
          <div className='lg:mr-8'>
            <select id="countryDropdown" value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Time */}
          <div className='flex justify-between px-2 md:px-0'>
            {selectedCountry?
              <span> {time} </span>
              :<span> 00:00:00 </span>
            }
            
            <button className='disabled:text-gray-400 md:ml-5 lg:mr-5' id='playStopBtn' onClick={handleBtnClick} disabled={!selectedCountry}> 
              {selectedCountry && isClockRunning?'Pause':'Start'} 
            </button>
          </div>

        </div>
      </div>

      {userObject && (
        <div className='w-full flex flex-col justify-center items-center'>
          <h1 className='m-4'> Profile page </h1>
          <div className='w-3/4 rounded-lg border-2 border-black px-8 py-4 flex flex-col lg:flex-row lg:justify-between'>
            <div> 
              <div> {userObject.name} </div>
              <span> {userObject.username} | {userObject.company.catchPhrase} </span>
            </div>
            <div>
              <div> {`${userObject.address.street}, ${userObject.address.city}`} </div>
              <span> {userObject.email} | {userObject.phone} </span>
            </div>
          </div>
          
          <div className='flex flex-wrap justify-center items-center'> 
            {userPosts && userPosts.map((post, index) => { return <PostCard key={index} post = {post}/>})} </div>
        </div>
      )}
    </div>
  )
}

export default UserDetails;