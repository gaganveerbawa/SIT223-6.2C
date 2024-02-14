import React from 'react'
import './HomePage.css'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FindArticles from '../component/FindArticles';
import FindQuestions from '../component/FindQuestions';
import deakin from '../assets/images/deakin.jpg'
import deakin2 from '../assets/images/deakin2.jpg'
import deakin3 from '../assets/images/deakin3.png'
import Carousel from 'react-bootstrap/Carousel';

export default function HomePage() {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                        <img className='mainImage' src={deakin} alt="deakin" />
                </Carousel.Item>
                <Carousel.Item>
                        <img className='mainImage' src={deakin2} alt="deakin" />
                </Carousel.Item>
                <Carousel.Item>
                        <img className='mainImage' src={deakin3} alt="deakin" />
                </Carousel.Item>
            </Carousel>
            <br />
            <br />
            <h1 style={{ textAlign: "center" }}>Welcome to Ask and Post, DEV@DEAKIN!</h1>
            <br />
            <br />
            <div >
                <Tabs className='fs-3' fill defaultActiveKey="first">
                        <br />
                    <Tab eventKey="first" title="Find Questions">
                        <FindQuestions />
                    </Tab>
                    <Tab eventKey="second" title="Find Articles">
                        <FindArticles />
                    </Tab>
                    <Tab eventKey="third" title="About Us">
                       <h1>
                        This site lets you post and ask questions.
                        </h1>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
