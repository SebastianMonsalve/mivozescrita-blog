import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import parse from "html-react-parser";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router";
import "./AllBlogs.css";

function AllBlogs() {
  const context = useContext(myContext);
  const { getAllBlog, loading } = context;
  const navigate = useNavigate();

  const truncateContent = (content) => {
    const lines = content.split("\n");
    return lines.slice(0, 3).join("\n") + (lines.length > 3 ? "..." : "");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="all-container">
        <div className="all-title">
          <h3>Todas las publicaciones</h3>
          <div className="all-line"></div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="all-blogs-container">
            {getAllBlog.length > 0 ? (
              <>
                {getAllBlog
                  .slice()
                  .reverse()
                  .map((item, index) => {
                    const { thumbnail, date, id } = item;
                    return (
                      <div
                        className="all-card"
                        onClick={() => navigate(`/bloginfo/${id}`)}
                        key={index}
                      >
                        <div className="all-card-image">
                          <img src={thumbnail} alt="blog" draggable="false" />
                          <div className="all-card-info">
                            <p className="all-card-date">{date}</p>
                            <p className="all-card-admin">
                              #{item.blogs.category}
                            </p>
                          </div>
                        </div>
                        <div className="all-content">
                          <h1 className="all-blog-title">{item.blogs.title}</h1>
                          <div className="all-description">
                            {parse(truncateContent(item.blogs.content))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            ) : (
              <div className="all-not-found">
                <img src="/Empty-blogs.png" alt="Sin blogs" draggable="false" />
                <p>Todavía no hay publicaciones disponibles.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default AllBlogs;
