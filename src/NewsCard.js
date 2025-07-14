import React from 'react';

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <img src={article.urlToImage || "https://via.placeholder.com/300"} alt="News" />
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
}

export default NewsCard;
