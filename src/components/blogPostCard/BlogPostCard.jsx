import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Loader from "../loader/Loader";
import "./BlogPostCard.css";

function BlogPostCard() {
  const context = useContext(myContext);
  const { getAllBlog, loading } = context;

  const navigate = useNavigate();

  const recentBlogs = getAllBlog.slice(-4).reverse();

  const truncateContent = (content) => {
    const lines = content.split("\n");
    return lines.slice(0, 3).join("\n") + (lines.length > 3 ? "..." : "");
  };

  return (
    <div>
      <section className="blog-home">
        {loading ? (
          <Loader />
        ) : (
          <div className="blog-home-container">
            <div className="blog-cards-wrapper">
              {recentBlogs.length > 0 ? (
                <>
                  <div className="blog-home-large">
                    <h3 className="blog-subtitle">Publicación más reciente</h3>
                    {recentBlogs.slice(0, 1).map((item, index) => {
                      const { thumbnail, date, id } = item;
                      return (
                        <div
                          className="blog-card-large"
                          key={index}
                          onClick={() => navigate(`/bloginfo/${id}`)}
                        >
                          <div className="blog-card-large-image">
                            <img src={thumbnail} alt="blog" draggable="false" />
                          </div>
                          <div className="blog-card-large-text">
                            <div className="blog-card-info">
                              <h2 className="blog-card-large-admin">
                                #{item.blogs.category}
                              </h2>
                              <h2 className="blog-card-large-date">{date}</h2>
                            </div>
                            <h1 className="blog-card-large-title">
                              {item.blogs.title}
                            </h1>
                            <div className="blog-card-large-description">
                              {parse(truncateContent(item.blogs.content))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="blog-home-small">
                    <h3 className="blog-subtitle">Otras Publicaciones</h3>
                    {recentBlogs.slice(1).map((item, index) => {
                      const { thumbnail, date, id } = item;
                      return (
                        <div
                          className="blog-card-small"
                          key={index + 1}
                          onClick={() => navigate(`/bloginfo/${id}`)}
                        >
                          <div className="blog-card-small-image">
                            <img src={thumbnail} alt="blog" draggable="false" />
                            <div className="blog-card-small-info">
                              <p className="blog-card-large-admin-2">
                                #{item.blogs.category}
                              </p>
                              <p className="card-date">{date}</p>
                            </div>
                          </div>
                          <div className="blog-card-small-text">
                            <h1 className="blog-card-small-title">
                              {item.blogs.title}
                            </h1>
                            <div className="blog-card-small-description">
                              {parse(truncateContent(item.blogs.content))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="not-found">
                  <img
                    src="/Empty-blogs.png"
                    alt="Sin blogs"
                    draggable="false"
                  />
                  <p>Todavía no hay publicaciones disponibles.</p>
                </div>
              )}
            </div>
            <div className="see-more-wrapper">
              <Link to="/allblogs">
                {recentBlogs.length > 0 ? (
                  <button className="see-more-button">Mostrar más</button>
                ) : (
                  ""
                )}
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default BlogPostCard;
