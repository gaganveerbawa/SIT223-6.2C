import React from 'react'
import error from '../assets/images/error.jpg'

export default function ErrorPage({ message }) {
    return (
        <div className='error'>
            <center><h1>{message}</h1></center>
            <img src={error} alt="error" style={{ width: '100%' }} />
        </div>
    )
}
