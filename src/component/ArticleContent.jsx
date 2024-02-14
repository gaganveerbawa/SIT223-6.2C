import React, { useState } from 'react';
import './QuestionContent.css';
import UploadImage from './UploadImage';
import { db } from '../utils/firebase';
import { collection, addDoc } from "firebase/firestore";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

// ArticleContent component to allow users to input and submit articles
function ArticleContent() {
    // Use the navigate hook to programmatically change routes
    const homePage = useNavigate();

    // State to store if the image has been uploaded
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    // State to store the uploaded image URL
    const [imageUrl, setImageUrl] = useState('');

    // Local state to store article details
    const [article, setArticle] = useState({
        Title: '',
        Abstract: '',
        ArticleText: '',
        Tags: '',
    });

    // Destructuring for easier access
    const { Title, Abstract, ArticleText, Tags } = article;

    // Asynchronous function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        // Ensure all fields are filled before posting
        if (!Title || !Abstract || !ArticleText || !Tags) {
            alert("Please fill in all fields before posting.");
            return;
        }
        if (!isImageUploaded) {
            alert("Please Upload the image before posting");
            return;
        }

        try {
            // Add data to Cloud Firestore
            const docRef = await addDoc(collection(db, "articles"), {
                title: Title,
                abstract: Abstract,
                articleText: ArticleText,
                tags: Tags,
                imageUrl: imageUrl,
                createdAt: format(new Date(), 'yyyy-MM-dd')  // Store the current date and time
            });

            alert("Article Posted Successfully!");

            // Log the document ID 
            console.log("Document written with ID: ", docRef.id);

            // Redirect user to the home page
            homePage('/');

            // Clear the input fields after successful submission
            setArticle({ Title: '', Abstract: '', ArticleText: '', Tags: '' });

        } catch (error) {
            alert("Error Posting Article.");
            console.error("Error adding document: ", error);
        }
    }

    // Function to update the article state as user types
    function handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        setArticle((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            };
        });
    }

    return (
        <div className='content'>
            {/* Input field for the title */}
            <div className="d-flex align-items-center">
                <label>Title</label>
                <input
                    className="flex-fill p-2"
                    type="text"
                    value={Title}
                    name='Title'
                    onChange={handleChange}
                    placeholder='Enter a descriptive title' />
            </div>
            {/* Component to handle image uploads */}
            <UploadImage onImageUpload={(url) => {
                setImageUrl(url);
                setIsImageUploaded(true);
            }} />
            {/* Textarea for abstract */}
            <div>
                <label htmlFor="abstractArea">Abstract</label>
                <textarea id="abstarctArea" rows="5"
                    name='Abstract'
                    value={Abstract}
                    onChange={handleChange}></textarea>
            </div>
            {/* Textarea for the main article content */}
            <div>
                <label htmlFor="articleArea">Article Text</label>
                <textarea id="articleArea" rows="10"
                    name='ArticleText'
                    value={ArticleText} onChange={handleChange}></textarea>
            </div>
            {/* Input field for the tags */}
            <div className="d-flex align-items-center">
                <label>Tags</label>
                <input
                    className="flex-fill p-2"
                    type="text"
                    name='Tags'
                    value={Tags}
                    onChange={handleChange}
                    placeholder='Please add up to 3 tags to describe what your article is about e.g., Java' />
            </div>
            {/* Button to post the article */}
            <div className='post'>
                <button className="postbutton" onClick={handleSubmit} type="submit">
                    Post
                </button>
            </div>
        </div>
    );
}

// Export the component for external use
export default ArticleContent;
