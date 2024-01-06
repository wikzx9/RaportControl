import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const RapportShow = () => {
  const [raport, setRaport] = useState({});
  const[loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(()=>{
    setLoading(true);
    axios
      .get(`http://localhost:3001/raport/${id}`)
      .then((response)=>{
        setRaport(response.data.info)
        setLoading(false)
      })
      .catch((error) =>{
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
     <div className='p-4'>
      <BackButton/>
      {loading ? (
        <Spinner/>
      ) : (
        <div className='flex flex-col border-2 border-red-500 rounded-xl w-[600px] p-4 mx-auto'> 
        <h2 className='text-3xl my-4'>Raport {raport.lokalizacja} z dnia {raport.data} </h2>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-800'>ID</span>
            <span>{raport._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-800'>Lokalizacja: </span>
            <span>{raport.lokalizacja}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-800'>Pracownicy: </span>
            <span>{raport.pracownicy}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-800'>Opis prac wykonanych: </span>
            <span>{raport.opis}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-800'>Data: </span>
            <span>{raport.data}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-800'>Materiały: </span>
            <span>{raport.materialy}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-800'>Czas pracy na miejscu: </span>
            <span>{raport.czaspracy}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-800'>Data utwożenia: </span>
            <span>{new Date(raport.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-800'>Data ostatniej edycji: </span>
            <span>{new Date(raport.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default RapportShow