import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const userControl = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }
  return (
    <div className='p-4'>
    <div className='flex justify-between items-center'>
      <h1 className='text-3xl my-8'>Lista użytkowników</h1>
    </div>
    {loading ? (
      <Spinner />
    ) : (
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='border border-red-500 rounded-md'>Nr</th>
            <th className='border border-red-500 rounded-md'>Nazwa</th>
            <th className='border border-red-500 rounded-md'>User</th>
            <th className='border border-red-500 rounded-md'>Admin</th>
            <th className='border border-red-500 rounded-md'>
            <Link to='/users/add'>Dodaj użytkownika
              <MdOutlineAddBox className=' text-green-800 text-2xl w-full' />
            </Link>
            </th>
          </tr>
        </thead>
          <tbody>
            {users && users.map((user, index) => (
              <tr key={user._id || index} className='h-8'>
                <td className='border border-red-500 rounded-md text-center'>{index + 1}</td>
                <td className='border border-red-500 rounded-md text-center'>{user.email}</td>
                <td className='border border-red-500 rounded-md text-center'>{user.roles.User ? 'x' : ''}</td>
                <td className='border border-red-500 rounded-md text-center'>{user.roles.Admin ? 'x' : ''}</td>
                <td className='border border-red-500 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/users/delete/${user._id}`}>
                     <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </div>
  )
}

export default userControl