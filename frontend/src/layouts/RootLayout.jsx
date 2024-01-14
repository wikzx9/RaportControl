import React,{ useContext } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import axios from 'axios';

const RootLayout = () => {

    const {auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async () => {
      axios.put(`http://localhost:3001/users/logout/${auth.accessToken}`, {
        refreshToken: ''
      })
      setAuth({});
      navigate('/login');
    }
  return (
    <div>
       <header className='flex justify-between items-center w-full h-auto rounded-b-lg mb-5 p-3 bg-red-600 text-gray-300'>
       <h1 className='w-auto'>Rapport Control App</h1>
       <nav className='flex gap-2 justify-end'>
       <NavLink to="/" className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Witaj</NavLink>
       <NavLink to="rapport" className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Raporty</NavLink>
       <NavLink to="users" className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Użytkownicy</NavLink>
       {!auth.user ? (
       <NavLink to="login" className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Logowanie</NavLink>
       ) : (
       <div>
        <button onClick={logout} className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Wyloguj</button>
       </div>
        )}
       </nav>
       </header>
       <main>
           <Outlet />
       </main>
   </div>
  )
}

export default RootLayout