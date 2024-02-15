import React from 'react'
import './Header.css'
import { Link } from "react-router-dom";
import { useAuth } from '../context/authContext';

function Header() {
    const { user } = useAuth();
    return (

        <div className='navBar'>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <h4><b><i className="fa fa-home"></i> DEV@Gagan</b></h4>
            </Link>

            <input className='searchBar' type="searchBar" placeholder="&#xF002; 
                 Search..." style={{ fontFamily: 'FontAwesome' }} />

            <Link to="/plans">
                <button className="navButton" style={{ backgroundColor: '#da6913' }}> <i className="fa fa-dollar"></i> PLANS</button>
            </Link>
            {user ? (
                <>
                    <Link to="/post" className="navLink">
                        <button className="navButton postButton" style={{ backgroundColor: 'black'}}> <i className="fa fa-clipboard"></i> POST</button>
                    </Link>

                    <Link to="/profile" className="navLink">
                        <button className="navButton profileButton" style={{ backgroundColor: '#d6d649'}}><i className="fa fa-user"></i> PROFILE</button>
                    </Link>

                    <Link to="/logout" className="navLink" >
                        <button className="navButton loginButton" style={{ backgroundColor: 'green'}}><i className="fa fa-sign-out"></i> LOGOUT</button>
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/login" className="navLink" >
                        <button className="navButton loginButton" style={{ backgroundColor: 'green'}}><i className="fa fa-sign-in" ></i> LOGIN</button>
                    </Link>

                    <Link to="/signup" className="navLink" >
                        <button className="navButton signupButton" style={{ backgroundColor: '#e74545'}}><i className="fa fa-user-plus"></i> SIGN UP</button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default Header