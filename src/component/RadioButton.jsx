import React, { useState } from 'react';
import './RadioButton.css'
import Heading from './Heading';
import ArticleContent from './ArticleContent';
import QuestionContent from './QuestionContent';

function RadioButton() {

    const [post, setContent] = useState('question');
    return (
        <>
        {/* <Header/> */}
        <div className='html'>
        <Heading text={"New Post"}/>
            <div className="radio">
                Select Post Type:
                <input className="select" type="radio" defaultChecked="true" onClick={() => setContent('question')} id="Question" name="Post_type" value="question"/>
                <label htmlFor="Question">Question</label>
                <input className="select" type="radio" onClick={() => setContent('article')} id="Article" name="Post_type" value="article" />
                <label htmlFor="Article">Article</label>
            </div>
            <Heading text={"What do you want to ask or share"}/>
            {post === 'question' && <QuestionContent />}
            {post === 'article' && <ArticleContent />}
        </div>
        </>

    );
}

export default RadioButton;
