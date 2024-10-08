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
            <header className="app-header">
                <h1 className="title">Latest News</h1>
            </header>
            <main className="app-content">
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">Error fetching news: {error.message}</p>}
                <div className="news-grid">
                    {news.length > 0 ? (
                        news.map((article, index) => (
                            <div className="news-card" key={index}>
                                <h2 className="news-title">
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                                        {article.name}
                                    </a>
                                </h2>
                                {article.image?.thumbnail?.contentUrl ? (
                                    <img className="news-image" src={article.image.thumbnail.contentUrl} alt={article.name} />
                                ) : (
                                    <img className="news-image" src="placeholder-image-url" alt="Placeholder" />
                                )}
                                <p className="news-description">{article.description}</p>
                                <a className="read-more" href={article.url} target="_blank" rel="noopener noreferrer">
                                    Read more
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>No news articles available.</p>
                    )}
                </div>
            </main>
            <footer className="app-footer">
                <p>© 2024 Pari Yojna. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
