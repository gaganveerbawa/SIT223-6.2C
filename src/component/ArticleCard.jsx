import React from 'react';

function ArticleCard({ title, description, date, imageUrl, tag, onArticleDeleted, id }) {
    return (
        <div className="card">
            <img style={{width: "40%"}} src={imageUrl} alt={title} />
            <h5 className="quesTitle">{title}</h5>
            <p className="description">{description}</p>
            <small className="tags">Posted on: {date}</small>
            <small className="tags">Tags: {tag}</small>
            <button className="deleteQues" onClick={() => onArticleDeleted(id)}>Delete Article</button>
        </div>
    )}

export default ArticleCard;
