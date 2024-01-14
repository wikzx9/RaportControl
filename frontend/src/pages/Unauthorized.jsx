import { useNavigate } from "react-router-dom"
import  { NavLink } from "react-router-dom"
const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className='flex flex-col border-2 border-red-500 rounded-xl w-[600px] p-4 mx-auto'>
            <h1 className='text-3xl my-4'>Error 401 Brak autoryzacji</h1>
            <br />
            <p className="p-5">Niem masz dostępu to tej strony gdyż nie masz uprawnień bądź nie jesteś zalogowany.</p>
            <NavLink to="/login" className='text-decoration-none p-2 border-current border-2 rounded-xl bg-red-500 border-red-700 hover:bg-red-400'>Logowanie</NavLink>
        </div >
    )
}

export default Unauthorized
