import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({destination = '/rapport'}) => {
  return (
    <div className='flex'>
        <Link to={destination} className='bg-red-700 text-white px-4 py-1 rounded-lg w-fit'>
            <BsArrowLeft className='text-2xl'/>
        
        </Link>
    </div>
  )
}

export default BackButton