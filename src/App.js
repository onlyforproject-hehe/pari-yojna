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
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    return (
        <div className="App">
            <h1 className="title">Latest News</h1>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error fetching news: {error.message}</p>}
            <div className="news-grid">
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <div className="news-card" key={index}>
                            <h2 className="news-title">{article.name}</h2>
                            {article.image?.thumbnail?.contentUrl ? (
                                <img className="news-image" src={article.image.thumbnail.contentUrl} alt={article.name} />
                            ) : (
                                <img className="news-image" src="placeholder-image-url" alt="Placeholder" />
                            )}
                            <p className="news-description">{article.description}</p>
                            <a className="read-more" href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
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
