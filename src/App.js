import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

function App() {
  const [news, setNews] = useState([]);
  const apiKey = '4e2f93c89dd04baa8f88e02d2862d15c'; // Replace with your actual API key
  const apiUrl = 'https://api.bing.microsoft.com/v7.0/news/search';

  // Array of possible queries
  const queries = ['latest', 'technology', 'health', 'sports', 'entertainment'];

  const fetchNews = async () => {
    try {
      // Randomly select a query from the array
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];

      // Create a random value to append as a query parameter
      const randomParam = Math.random();

      const response = await axios.get(apiUrl, {
        params: {
          q: randomQuery,
          _: randomParam // Add random parameter
        },
        headers: { 'Ocp-Apim-Subscription-Key': apiKey }
      });

      setNews(response.data.value);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews(); // Fetch news on initial page load
  }, []);

  return (
    <div className="container">
      <h1 className="title">Latest News</h1>
      <div className="news-grid">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-card">
              <img
                src={article.image?.contentUrl || article.image?.thumbnail?.contentUrl || 'https://via.placeholder.com/300'}
                alt={article.name}
                className="news-image"
              />
              <h2 className="news-title">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.name}
                </a>
              </h2>
              <p className="news-description">{article.description}</p>
            </div>
          ))
        ) : (
          <p>No news available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default App;
