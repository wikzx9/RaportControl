import { useState } from 'react'
import {createBrowserRouter, createRoutesFromElements,  Route, RouterProvider} from 'react-router-dom'
import React from 'react'

import Home from './pages/Home'
import Login from './pages/LogIn'
import RapportDelete from './pages/RapportDelete'
import RapportEdit from './pages/RapportEdit'
import RapportList from './pages/RapportList'
import RapportShow from './pages/RapportShow'
import UserControl from './pages/UserControl'
import RootLayout from './layouts/RootLayout'
import AddUser from './pages/AddUser'
import DeleteUser from './pages/DeleteUser'
import EditUser from './pages/EditUser'
import RapportAdd from './pages/RapportAdd'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>

        <Route path='login' element={<Login/>}/>
        <Route path='/rapport/edit/:id' element={<RapportEdit/>}/>
        <Route path='/rapport' element={<RapportList/>}/>
        <Route path='/rapport/detail/:id' element={<RapportShow/>}/>
        <Route path='/rapport/delete/:id' element={<RapportDelete/>}/>
        <Route path='/rapport/create' element={<RapportAdd/>} />
        
        

        <Route path='/users' element={<UserControl/>}>
          <Route path='add' element={<AddUser/>}/>
          <Route path='delete/:id' element={<DeleteUser/>}/>
          <Route path='edit/:id' element={<EditUser/>}/>
        </Route>
      </Route>
    ))
  return (
    <RouterProvider router={router}/>
  )
}

export default App
