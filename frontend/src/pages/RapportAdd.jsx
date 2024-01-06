import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';

const RapportAdd = () => {
  const [lokalizacja, setLokalizacja] = useState('');
  const [pracownicy, setPracownicy] = useState('');
  const [materialy, setMaterialy] = useState('');
  const [dataWykonaia, setDataWykonaia] = useState('');
  const [opis, setOpis] = useState('');
  const [czaspracy, setCzaspracy] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveRapport = () => {
    const data ={
      lokalizacja,
      pracownicy,
      materialy,
      czaspracy,
      opis,
      data: dataWykonaia,
    }
    setLoading(true);
    axios.post('http://localhost:3001/raport/dodaj', data)
      .then(() =>{
        setLoading(false);
        navigate('/rapport');
      })
      .catch((error) =>{
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  };
  return (
    <div  className='p-4'>
      <BackButton/>
      
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-red-500 rounded-xl w-[600px] p-4 mx-auto'>
      <h2 className=' text-center text-3xl my-4'>Dodaj raport</h2>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Lokalizacja prac</label>
          <input
          type='text'
          value={lokalizacja}
          onChange={(e) => setLokalizacja(e.target.value)}
          className='border-2 border-red-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Pracownicy</label>
          <input
          type='text'
          value={pracownicy}
          onChange={(e) => setPracownicy(e.target.value)}
          className='border-2 border-red-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Data pracy</label>
          <input
          type='text'
          value={dataWykonaia}
          onChange={(e) => setDataWykonaia(e.target.value)}
          className='border-2 border-red-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Wykorzystane materiały</label>
          <input
          type='text'
          value={materialy}
          onChange={(e) => setMaterialy(e.target.value)}
          className='border-2 border-red-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Opis</label>
          <input
          type='text'
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          className='border-2 border-red-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Czas pracy na miejscu</label>
          <input
          type='text'
          value={czaspracy}
          onChange={(e) => setCzaspracy(e.target.value)}
          className='border-2 border-red-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-red-700 m-8' onClick={handleSaveRapport}>
          Save
        </button>
      </div>
    </div>
  )
}

export default RapportAdd