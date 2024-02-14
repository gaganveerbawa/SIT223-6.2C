import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';    
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

export default function FindArticles() {
    // Hook to handle navigation
    const addArticle = useNavigate();

    // State to manage list of articles and filters
    const [articles, setArticles] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    // Fetch articles from Firebase when component mounts
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "articles")); // Fetching from 'articles' collection
            const articlesData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                articlesData.push({
                    id: doc.id,
                    title: data.title,
                    abstract: data.abstract,
                    tags: data.tags,
                    createdAt: data.createdAt,
                    imageUrl: data.imageUrl
                });
            });
            setArticles(articlesData);
        }
        fetchData();
    }, []);

    // Filter articles based on user input
    const filteredArticles = articles.filter(article => {
        return (
            article.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
            article.tags.toLowerCase().includes(tagFilter.toLowerCase()) &&
            (!dateFilter || article.createdAt.startsWith(dateFilter))
        );
    });

    // Remove article by its ID from local state
    const removeArticleById = (id) => {
        const updatedArticles = articles.filter(article => article.id !== id);
        setArticles(updatedArticles);
    }

    return (
        <div>
            <div>
                <center>
                    <br />
                    <h1>Find Articles</h1>
                    
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
                    
                    {/* Button to navigate to the article posting page */}
                    <button
                        className='filter'
                        onClick={() => addArticle('/post')}> 
                        Add Article
                    </button>
                </center>
            </div>

            {/* Render list of filtered articles */}
            {filteredArticles.map(article => (
                <ArticleCard
                    id={article.id}
                    key={article.id}
                    title={article.title}
                    description={article.abstract}
                    tag={article.tags}
                    date={article.createdAt}
                    imageUrl={article.imageUrl}
                    onArticleDeleted={removeArticleById}
                />
            ))}
        </div>
    )
}
