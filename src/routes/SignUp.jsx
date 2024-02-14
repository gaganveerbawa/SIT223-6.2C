import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './SignUp.css'
import { createAuthUserWithEmailAndPassword, createuserdocfromAuth } from '../utils/firebase'
function SignUp() {

  const home = useNavigate();

  const [contact, setcontact] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { displayName, email, password, confirmPassword } = contact
  console.log(contact)

  async function handleClick() {
    if (password !== confirmPassword) {
      alert('Password do not match')
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createuserdocfromAuth(user, { displayName })
      console.log(user)

      home('/');
    }
    catch (error) {
      console.log('error in creation', error.message);
      if (error.message.includes('email-already-in-use')) {
        alert('This email is already in use. Please use another email or login.');
      } else {
        alert('Error in account creation. Please try again.');
      }
    }
  }

  function handlepass(event) {
    const value = event.target.value
    const name = event.target.name

    setcontact((prevalue) => {
      return {
        ...prevalue,
        [name]: value

      }
    })
  }
  return (
    <div className="main">
      <div className='signup-container'>
        <h2 className="title">Create a Dev@Deakin Account</h2>
        <div className='signup-content'>
          <div className='signup-section1' >
            <ul>
              <li><label> Name*</label></li>
              <li><label> Email*</label></li>
              <li><label> Password*</label></li>
              <li><label> Confirm Password*</label></li>
            </ul>
          </div>
          <div className='signup-section'>
            <ul>
              <li><input className='signupInput'
                name='displayName'
                type='text'
                onChange={handlepass}
              /></li>
              <li><input className='signupInput'
                name='email'
                type='email'
                onChange={handlepass}
              /></li>
              <li><input className='signupInput'
                name='password'
                type='password'
                onChange={handlepass}
              /></li>
              <li><input className='signupInput'
                name='confirmPassword'
                type='password'
                onChange={handlepass}
              /></li>
              <li>
                <button className='create'
                  onClick={handleClick} >
                  Create
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp