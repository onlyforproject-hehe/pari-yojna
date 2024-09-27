import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://api.bing.microsoft.com/v7.0/news', {
                headers: {
                    'Ocp-Apim-Subscription-Key': '4e2f93c89dd04baa8f88e02d2862d15c', // Replace with your Bing API key
                },
            });
            setNews(response.data.value);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array for useCallback

    useEffect(() => {
        fetchNews();
    }, [fetchNews]); // Include fetchNews in the dependency array

    return (
        <div className="App">
            <h1>Latest News</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching news: {error.message}</p>}
            <div className="news-container">
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <div className="news-item" key={index}>
                            <h2>{article.name}</h2>
                            {article.image?.thumbnail?.contentUrl ? (
                                <img src={article.image.thumbnail.contentUrl} alt={article.name} />
                            ) : (
                                <img src="placeholder-image-url" alt="Placeholder" /> // Replace with a placeholder image URL
                            )}
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    ))
                ) : (
                    <p>No news articles available.</p>
                )}
            </div>
        </div>
    );
}


export default App;
