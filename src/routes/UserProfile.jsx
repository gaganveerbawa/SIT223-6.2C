import React from 'react'
import { useAuth } from '../context/authContext';
import './UserProfile.css'


export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className='profile'>
      <h1>Your Profile</h1>
      <h3>Name: {user.displayName}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Plan: {user.plan}</h3>
    </div>
  )
}
