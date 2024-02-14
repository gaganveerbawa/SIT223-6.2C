import React from 'react';
import './Heading.css'


function Heading({text}) {
    return (
        <div>
            <h4 className='headText'>{text}</h4>
        </div>
);
}
export default Heading