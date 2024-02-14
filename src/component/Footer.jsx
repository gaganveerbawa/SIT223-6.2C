import React from 'react'
import './Footer.css'
import facebook from '../assets/images/facebook.png'
import instagram from '../assets/images/instagram.png'
import twitter from '../assets/images/twitter.png'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <div className='footer'>
            <div className='footer-content'>
                <div className='footer-section' >
                    <h2><b>Explore</b></h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="/">Questions</a></li>
                        <li><a href="/">Articles</a></li>
                        <li><a href="/">Tutorial</a></li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h2><b>Support</b></h2>
                    <ul>
                        <li><a href="/">FAQs</a></li>
                        <li><a href="/">Help</a></li>
                        <li><a href="/">Contact Us</a></li>
                        <li><a href="/">Tutorial</a></li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h2><b>Stay Connected</b></h2>
                    <a href="https://www.facebook.com/DeakinUniversity/ ">
                        <img className="socialMedia" src={facebook} alt="facebook" />
                    </a>
                    <a href="https://twitter.com/Deakin">
                        <img className="socialMedia" src={twitter} alt="twitter" />
                    </a>
                    <a href="https://www.instagram.com/deakinuniversity">
                        <img className="socialMedia" src={instagram} alt="instagram" />
                    </a>
                </div>
            </div>
            <div className='footer-bottom'>
                <h2 className='footer-title'> <center>DEV@Deakin 2023</center></h2>
                <div className='footer-links'>
                    <a href="/">Privacy Policy</a>
                    <a href="/">Terms</a>
                    <a href="/">Code of Conduct</a>
                </div>
            </div>

        </div>

    );
}

export default Footer