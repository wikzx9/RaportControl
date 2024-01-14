import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from "react-router-dom";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const addUser = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState('');
  const [validUserName, setValidUserName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');  
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName]);

  useEffect(() => { 
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPassword(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [userName, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(userName);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg('Nieprawidłowa nazwa użytkownika lub hasło');
      return;
    }
    try{
        const response = await axios.post('http://localhost:3001/users/register',
        JSON.stringify({ user : userName, pwd : password }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
        );
        console.log(JSON.stringify(response.data));
        setSuccess(true);
        setUserName('');
        setPassword('');
        setMatchPassword(''); 
    } catch(err) {
      if(!err?.response){
        setErrMsg('Serwer nie odpowiada');
      } else if (err.response.status === 409) {
        setErrMsg('Użytkownik o podanej nazwie już istnieje');
      } else {
        setErrMsg('Rejestracja nie powiodła się');
      }
      errRef.current.focus();
    }
  }
  return (
    <>
      {success ? (
        <div>
          <h1 className='text-3xl my-4'>Użytkownik został dodany</h1>
          <p>
            <Link to="/users" className='p-2 bg-red-700 text-white mb-1 mt-8 ml-8 mr-8'>Wróć</Link>
          </p>
        </div>
      ): (
        <section className='flex flex-col border-2 border-red-500 rounded-xl w-[600px] p-4 mx-auto'>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1 className='text-3xl my-4'>Dodaj użytkownika</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className='text-xl mr-4 text-gray-800'>
              Nazwa użytkownika:
              <FontAwesomeIcon icon={faCheck} className={validUserName ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validUserName || !userName ?  "hide" : "invalid"} />
              </label><br />
              <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
              aria-invalid = {validUserName? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className='border-2 border-red-500 px-4 py-2'
              />
              <p id="uidnote" className={userFocus && userName && !validUserName ? "instructions" : "offscreen"}>
                4-24 znaków.<br />
                Musi zaczynać się od litery,<br />
                Litery, cyfry i znaki specjalne dozwolone.<br />
                </p>< br />
              <label htmlFor="password" className='text-xl mr-4 text-gray-800'>
                Hasło:
                <FontAwesomeIcon icon={faCheck} className={validPassword? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ?  "hide" : "invalid"} />
                </label><br />
                <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid = {validPassword? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                className='border-2 border-red-500 px-4 py-2'
                />
                <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8-24 znaków.<br />
                  Musi zawierać co najmniej jedną cyfrę i znak specjalny oraz duże i małe litery,<br />
                  Znaki specjalne dozwolone: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p><br />
                <label htmlFor="confirm-password" className='text-xl mr-4 text-gray-800'>
                  Potwierdź hasło:
                  <FontAwesomeIcon icon={faCheck} className={validMatchPassword && matchPassword ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validMatchPassword || !matchPassword ?  "hide" : "invalid"} /> 
                  </label><br />
                  <input
                  type="password"
                  id="confirm-password"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchPassword}
                  required
                  aria-invalid = {validMatchPassword? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchPasswordFocus(true)}
                  onBlur={() => setMatchPasswordFocus(false)}
                  className='border-2 border-red-500 px-4 py-2'
                  />
                  <p id="confirmnote" className={matchPasswordFocus && !validMatchPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Hasło musi się pokrywać z pierwszym polem<br />
                  </p><br />
                  
                  <button className='p-2 bg-red-700 text-white mb-1 mt-8 ml-8 mr-8' disabled={!validUserName || !validPassword ||!validMatchPassword ? true : false}>Dodaj</button>
          </form>    
        </section>
      )}
    </>
  )

}
export default addUser