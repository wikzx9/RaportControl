import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
       <header className='flex justify-between items-center w-full h-auto rounded-b-lg mb-5 p-3 bg-red-600 text-gray-300'>
       <h1 className='w-auto'>Rapport Control App</h1>
       <nav className='flex gap-2 justify-end'>
       <NavLink to="/" className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Witaj</NavLink>
       <NavLink to="rapport" className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Raporty</NavLink>
       <NavLink to="users" className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Użytkownicy</NavLink>
       <NavLink to="login" className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Logowanie</NavLink>
       </nav>
       </header>
       <main>
           <Outlet />
       </main>
   </div>
  )
}

export default RootLayout