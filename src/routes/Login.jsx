import './Login.css';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { signinAuthUserWithEmailAndPassword } from '../utils/firebase';
// import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../context/authContext';

function Login() {
  const home = useNavigate();
  const { setUser } = useAuth();

  const [contact, setcontact] = useState({
    email: '',
    password: ''
  });

  const { email, password } = contact;
  // console.log(contact);

  async function handleClick(event) {
    if (event.target.className === 'loginbutton') {
      if (!email.trim() || !password.trim()) {
        alert('Both email and password fields are required.');
        return;
      }
    }
    try {
      const response = await signinAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      if (response) {
        home('/');
        setUser(response.user);
        setcontact("");
      }
    } catch (error) {
      console.log('error in login', error.message);
      if (error.message.includes('invalid-login-credentials')) {
        alert('Invalid login credentials. Please try again.');
      }
    }
  }

  function handlepass(event) {
    const value = event.target.value;
    const name = event.target.name;
    setcontact((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      };
    });
  }

  return (
    <div className='parent'>
      <div className="login-container">
        <center class="fs-2 text-primary" >Login to access Services</center>
        <br />
        <label>Your email</label>
        <br />
        <input className='logininput' name='email' type='email' onChange={handlepass} />
        <br />
        <label>Your password</label>
        <br />
        <input className='logininput' name='password' type='password' onChange={handlepass} />
        <br />
        <button className='loginbutton' onClick={handleClick}>Login</button>

        <br />
        <br />
        <Link className='text-decoration-none' to='/signup'> Dont have a account? <Link class="position-absolute " className='signupbutton'>Sign Up</Link></Link>
      </div>
    </div>
  );
}

export default Login;
