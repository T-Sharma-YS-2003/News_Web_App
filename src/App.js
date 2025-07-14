import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import './App.css';

const API_KEY = process.env.REACT_APP_NEWS_API;
const categories = ["India", "Technology", "Science", "Business", "Sports"];

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("India");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchNews = async (searchTerm) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${API_KEY}`
      );
      const data = await res.json();
      if (data.status === "ok") {
        setArticles(data.articles);
      } else {
        console.log(data);
        setError(data.message || "Something went wrong. Please try again.");
        setArticles([]);
      }
    } catch (err) {
      setError("Failed to fetch news. Check your internet.");
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(query);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const handleSearch = () => {
    if (query.trim()) fetchNews(query);
  };

  return (
    <div className="app">
      <h1>📰 News Web App</h1>

      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="categories">
        {categories.map((cat) => (
          <button key={cat} onClick={() => { setQuery(cat); fetchNews(cat); }}>
            {cat}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Loading news...</p>}
      {error && <p className="error">{error}</p>}

      <div className="news-container">
        {!loading && !error && articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export default App;
