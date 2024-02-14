import React, { useState } from 'react';
import './QuestionContent.css';
import { db } from '../utils/firebase';
import { collection, addDoc } from "firebase/firestore";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function QuestionContent() {

    // Use the navigate hook to programmatically change routes
    const homePage = useNavigate();

    // Local state to manage question details
    const [question, setQuestion] = useState({
        Title: '',
        Problem: '',
        Tags: '',
    });

    // Destructuring for easier access
    const { Title, Problem, Tags } = question;

    // Log the current state for debugging purposes
    console.log(question);

    // Asynchronous function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        // Check if all required fields are filled
        if (!Title || !Problem || !Tags) {
            alert("Please fill in all fields before posting.");
            return;
        }

        try {
            // Add data to Cloud Firestore
            const docRef = await addDoc(collection(db, "questions"), {
                title: Title,
                problem: Problem,
                tags: Tags,
                createdAt: format(new Date(), 'yyyy-MM-dd')  // Store the current date and time
            });

            // Notify the user about successful submission
            alert("Question Posted Successfully!");

            // Log the document ID 
            console.log("Document written with ID: ", docRef.id);

            // Redirect user to the home page
            homePage('/');

            // Clear the input fields after successful submission
            setQuestion({ Title: '', Problem: '', Tags: '' });

        } catch (error) {
            // Handle and notify any errors
            console.error("Error adding document: ", error);
            alert("Error Posting Question.");
        }
    }

    // Update the state as user types in the input fields
    function handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        setQuestion((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            };
        });
    }

    return (
        <div className='content'>
            <div className="d-flex align-items-center">
                <label>Title</label>
                <input
                    required
                    className="flex-fill p-2"
                    type="text"
                    value={Title}
                    name='Title'
                    onChange={handleChange}
                    placeholder='Start your question with how, what, why, etc.'
                />
            </div>
            <div>
                <label htmlFor="problemArea">Describe your problem</label>
                <textarea
                    id="problemArea"
                    rows="15"
                    name='Problem'
                    value={Problem}
                    onChange={handleChange}>
                </textarea>
            </div>
            <div className="d-flex align-items-center">
                <label>Tags</label>
                <input
                    className="flex-fill p-2"
                    type="text"
                    name='Tags'
                    value={Tags}
                    onChange={handleChange}
                    placeholder='Please add up to 3 tags to describe what your question is about e.g., Java'
                />
            </div>
            <div className='post'>
                <button
                    className="postbutton"
                    onClick={handleSubmit}
                    type="submit">
                    Post
                </button>
            </div>
        </div>
    );
}

export default QuestionContent;