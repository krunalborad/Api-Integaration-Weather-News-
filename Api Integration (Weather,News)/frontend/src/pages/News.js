import { useEffect, useState } from "react";
import axios from "axios";

const News = ({ dark }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setError("");

      const res = await axios.get("http://localhost:5000/news");

      console.log("NEWS RESPONSE:", res.data);

      if (res.data.articles) {
        setArticles(res.data.articles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.log("NEWS FETCH ERROR:", err);
      setError("Unable to load news");
    }
  };

  return (
    <div className={dark ? "page dark-bg" : "page"}>
      <div className="card">
        <h2>📰 Latest News</h2>

        {error && <p className="error">{error}</p>}

        <div className="news-container">
          {articles.length === 0 && !error && (
            <p>No news available</p>
          )}

          {articles.slice(0, 6).map((news, index) => (
            <div key={index} className="news-card">
              <img
                src={
                  news.urlToImage ||
                  "https://via.placeholder.com/300"
                }
                alt="news"
              />

              <h3>{news.title}</h3>
              <p>{news.description}</p>

              <a href={news.url} target="_blank" rel="noreferrer">
                Read more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;