import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const RapportList = () => {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchInputDuo, setSearchInputDuo] = useState('');
  const navigate = useNavigate();

  const handleSearchByName = () => {

    navigate(`/rapport/lista/${searchInput}`);
  };

  const handleSearchByDate = () => {

    navigate(`/rapport/lista/data/${searchInputDuo}`);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/raport/lista`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setRapports(response.data.info);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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
        <h1 className='text-3xl my-8'>Lista raportów</h1>
        <form>
      <label className='text-xl'>Wpisz nazwę lokalizacji lub wybierz datę:</label>
      <input
        className='border m-2 border-red-500 rounded-md'
        type='text'
        name='nazwa'
        required
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button className='border m-2 p-2 border-red-500 rounded-md' onClick={handleSearchByName} disabled={searchInput.length === 0}>
        Szukaj po nazwie
      </button>
      <input
        className='border m-2 border-red-500 rounded-md'
        type='date'
        name='nazwa'
        required
        value={searchInputDuo}
        onChange={(e) => setSearchInputDuo(e.target.value)}
      />
      <button className='border m-2 p-2 border-red-500 rounded-md' onClick={handleSearchByDate} disabled={searchInputDuo.length === 0}>
        Szukaj po dacie
      </button>
    </form>
        <Link to='/rapport/create'>
          <MdOutlineAddBox className=' text-green-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-red-500 rounded-md'>Numer</th>
              <th className='border border-red-500 rounded-md'>Lokalizacja</th>
              <th className='border border-red-500 rounded-md max-md:hidden'>Data</th>
            </tr>
          </thead>
          <tbody>
            {rapports.map((rapport, index) => (
              <tr key={rapport._id || index} className='h-8'>
                <td className='border border-red-500 rounded-md text-center'>{index + 1}</td>
                <td className='border border-red-500 rounded-md text-center'>{rapport.lokalizacja}</td>
                <td className='border border-red-500 rounded-md text-center max-md:hidden'>{rapport.data}</td>
                <td className='border border-red-500 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/rapport/detail/${rapport._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/rapport/edit/${rapport._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/rapport/delete/${rapport._id}`}>
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
  );
};

export default RapportList;
