import React from 'react';
import QuestionCard from './QuestionCard';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

export default function FindQuestions() {
    // Hooks to handle navigation
    const addQuestion = useNavigate();
    // const homePage = useNavigate();

    // State to manage list of questions and filtersnpm 
    const [questions, setQuestions] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    // Fetch questions from Firebase when component mounts
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "questions"));
            const questionsData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                questionsData.push({
                    id: doc.id,
                    title: data.title,
                    problem: data.problem,
                    tags: data.tags,
                    createdAt: data.createdAt
                });
            });
            setQuestions(questionsData);
        }
        fetchData();
    }, []);

    // Filter questions based on user input
    const filteredQuestions = questions.filter(question => {
        return (
            question.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
            question.tags.toLowerCase().includes(tagFilter.toLowerCase()) &&
            (!dateFilter || question.createdAt.startsWith(dateFilter))
        );
    });

    // Remove question by its ID from local state
    const removeQuestionById = (id) => {
        const updatedQuestions = questions.filter(question => question.id !== id);
        setQuestions(updatedQuestions);
    }

    return (
        <div>
            <div>
                <center>
                    <br />
                    <h1>Find Questions</h1>
                    
                    {/* Input fields to set filters */}
                    <input className='filter'
                        type="text"
                        placeholder="Filter by title"
                        onChange={e => setTitleFilter(e.target.value)}
                    />
                    <input
                        className='filter'
                        type="text"
                        placeholder="Filter by tag"
                        onChange={e => setTagFilter(e.target.value)}
                    />
                    <input
                        className='filter'
                        type="date"
                        onChange={e => setDateFilter(e.target.value)}
                    />
                    
                    {/* Button to navigate to the question posting page */}
                    <button
                        className='filter deleteQues'
                        onClick={() => addQuestion('/post')}>
                        Add Question
                    </button>
                </center>
            </div>

            {/* Render list of filtered questions */}
            {filteredQuestions.map(question => (
                <QuestionCard
                    id={question.id}
                    key={question.id}
                    title={question.title}
                    description={question.problem}
                    tag={question.tags}
                    date={question.createdAt}
                    onQuestionDeleted={removeQuestionById}
                />
            ))}
        </div>
    )
}