import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const RapportEdit = () => {
  const [lokalizacja, setLokalizacja] = useState('');
  const [pracownicy, setPracownicy] = useState('');
  const [dataWykonaia, setDataWykonaia] = useState('');
  const [materialy, setMaterialy] = useState('');
  const [czaspracy, setCzasPracy] = useState('');
  const [opis, setOpis] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/raport/${id}`)
      .then((response) => {
        const { lokalizacja, pracownicy, materialy, data, czaspracy, opis } = response.data.info;
        setLokalizacja(lokalizacja);
        setPracownicy(pracownicy);
        setMaterialy(materialy);
        setDataWykonaia(data);
        setCzasPracy(czaspracy);
        setOpis(opis);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]);

  const handleEditRaport = () => {
    const dataToSend = {
      lokalizacja,
      pracownicy,
      materialy,
      czaspracy,
      opis,
      data: dataWykonaia,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3001/raport/aktualizuj/${id}`, dataToSend)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Raport edytowany poprawnie', { variant: 'success' });
        navigate('/rapport');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      
      
      {loading ? <Spinner /> : null}
      <div className='flex flex-col border-2 border-red-500 rounded-xl w-[600px] p-4 mx-auto'>
      <h1 className='text-3xl my-4'>Edycja Raportu</h1>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Lokalizacja</label>
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
            className='border-2 border-red-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Wykorzystane materiały</label>
          <input
            type='text'
            value={materialy}
            onChange={(e) => setMaterialy(e.target.value)}
            className='border-2 border-red-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Opis</label>
          <input
            type='text'
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            className='border-2 border-red-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Czas pracy na miejscu</label>
          <input
            type='text'
            value={czaspracy}
            onChange={(e) => setCzasPracy(e.target.value)}
            className='border-2 border-red-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-800'>Data</label>
          <input
            type='text'
            value={dataWykonaia}
            onChange={(e) => setDataWykonaia(e.target.value)}
            className='border-2 border-red-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-red-700 text-white mb-1 mt-8 ml-8 mr-8' onClick={handleEditRaport}>
          Zapisz
        </button>
        <Link className='p-2 bg-red-700 text-white mt-1 mb-8 ml-8 mr-8 text-center' to={'/rapport'}>
          Wróć
        </Link>
      </div>
    </div>
  );
};

export default RapportEdit;
