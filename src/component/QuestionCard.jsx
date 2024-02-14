import React, { useState } from 'react';
import './QuestionCard.css';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

function QuestionCard(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    const handleDelete = async (event) => {
        event.stopPropagation();  // Prevent event bubbling

        const documentRef = doc(db, 'questions', props.id);

        try {
            await deleteDoc(documentRef);
            console.log("Document successfully deleted!");
            props.onQuestionDeleted(props.id);
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Error Deleting Question");
        }
    };

    return (

        <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
            {isExpanded ? (
                <>
                    <h2 className='quesTitle'>{props.title}</h2>
                    <p className='description'>{props.description}</p>
                    <h3 className='tags'>Tags: {props.tag} </h3> 
                    <h3 className='tags'> Date Posted: {props.date}</h3>
                </>
            ) : (
                <>
                    <h2 className='quesTitle'>{props.title}</h2>
                    <p className='description' >{props.description}</p>
                </>
            )}
            <br />
            <button className='deleteQues' onClick={handleDelete} >Delete Question</button>
                <br />
        </div>
    );
}

export default QuestionCard;