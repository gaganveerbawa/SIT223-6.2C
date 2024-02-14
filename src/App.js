import './App.css';
import Header from './component/Header'
import { Routes, Route } from 'react-router-dom'
import SignUp from './routes/SignUp'
import Login from './routes/Login'
import RadioButton from './component/RadioButton'
import HomePage from './routes/HomePage';
import UserProfile from './routes/UserProfile';
import Footer from './component/Footer';
import Plans from './routes/Plans';
import ErrorPage from './routes/ErrorPage'; 
import { useAuth } from './context/authContext';
import Logout from './routes/Logout';

function App() {
  const { user } = useAuth();

  return (
    <>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<UserProfile/>} />
          <Route path='/post' element={user ? <RadioButton /> : <ErrorPage message={"You first need to Login to Post."}/>} />
          <Route path='/plans' element={<Plans/>} />
          <Route path='/signup' element={user ? <ErrorPage /> : <SignUp />} />
          <Route path='/login' element={!user ? <Login/> : <ErrorPage/>} />
          <Route path='/logout' element={user ? <Logout/> : <ErrorPage/>} />
        </Routes>
      </div>
      <br/>
      <br/>
      <Footer/>
      </>
  );
}

export default App;