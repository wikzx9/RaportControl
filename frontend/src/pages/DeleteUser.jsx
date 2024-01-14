import React, { useState } from 'react';
import axios from 'axios';
import {  useParams,Link,useNavigate } from 'react-router-dom';

const deleteUser = () => {
    const [loading, setLoading] = useState(false)
    const {id}= useParams()
    const navigate = useNavigate();
    const handleDeleteRapport = () =>{
    setLoading(true);
    axios.delete(`http://localhost:3001/users/usun/${id}`)
    .then(()=>{
      setLoading(false)
    })
    .catch((error) =>{
      setLoading(false)
    })
    navigate('/users');
  }
  return (
    <div className='p-4'>
      <div className='flex flex-col items-center border-2 border-red-500 rounded-xl w-[600px] p-8 mx-auto' >
        <h3 className='text-2xl'>Jesteś pewien że chcesz usunąć tego użytkownika</h3>

        <button
        className='p-4 bg-red-700 text-white mb-1 mt-8 ml-8 mr-8 w-full'
        onClick={handleDeleteRapport}>
          Tak
        </button>
        <Link className='w-full p-4 bg-red-700 text-white mt-1 mb-8 ml-8 mr-8 text-center' to={'/rapport'}>
          Nie
        </Link>
      </div>
    </div>
  )

}
export default deleteUser