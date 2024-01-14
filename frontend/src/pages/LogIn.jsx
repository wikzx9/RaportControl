import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LogIn = () => {
    const { setAuth } = useAuth();


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3001/auth/`,
            { 
                user: user,
                pwd: pwd
            },
            {   
                headers: { 
                    'Content-Type': 'application/json',
                    'withCredentials': true,
                },
            });
            
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {  
          console.error(err);
            if (!err?.response) {
                setErrMsg('Serwer nie odpowiada');
            } else if (err.response?.status === 400) {
                setErrMsg('Brakuje nazwy bądź hasła');
            } else if (err.response?.status === 401) {
                setErrMsg('Brak autoryzacji');
            } else {
                setErrMsg('Logowanie zakończone niepowodzeniem');
            }
            errRef.current.focus();
        }
    }
  return (
    <div className='p-4'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className='flex flex-col items-center border-2 border-red-500 rounded-xl w-[600px] p-8 mx-auto'>
          <h1 className='text-2xl'>Logowanie</h1>
          <form onSubmit={handleSubmit}>
              <label className='text-xl mr-4 text-gray-800' htmlFor="username">Nazwa użytkownika:</label>
              <input
                  className='border-2 border-red-500 px-4 py-2  w-full '
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
              />

              <label className='text-xl mr-4 text-gray-800' htmlFor="password">Hasło:</label>
              <input
                  className='border-2 border-red-500 px-4 py-2  w-full '
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
              />
              <button className='p-2 bg-red-700 text-white m-8 rounded-xl'>Zaloguj</button>
          </form>
        </div>
    </div>
  )
}

export default LogIn