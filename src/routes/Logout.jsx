import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../context/authContext';


export default function Logout() {
    const home = useNavigate();
    const { user, setUser } = useAuth();

    const handleSignOut = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            alert('Signed out successfully.');
            setUser(null);
            home('/');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    }

    const displaySignOut = () => {
        if (user) {
            return (
                <div style={{margin: '100px'}}>
                    <center>
                    <h5 style={{ color: 'red', fontWeight: 'bolder', textAlign: 'center' }}>Currently logged in as: {user.email}</h5>
                    <button className='loginbutton' onClick={handleSignOut}>
                        Sign Out
                    </button>
                    </center>
                </div>
            );
        }
        return null; // return nothing if the user isn't logged in
    };

    return (
        <div>
            {displaySignOut()}
        </div>

    )
}
