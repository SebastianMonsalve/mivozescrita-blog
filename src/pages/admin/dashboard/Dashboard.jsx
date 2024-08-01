import React, { useContext, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import myContext from "../../../context/data/myContext";
import parse from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import DeleteConfirm from "../../../components/DeleteConfirm/DeleteConfirm";
import "./Dashboard.css";

function Dashboard() {
  const context = useContext(myContext);
  const { getAllBlog, deleteBlogs, loading } = context;
  const navigate = useNavigate();

  const truncateContent = (content) => {
    const lines = content.split("\n");
    return lines.slice(0, 3).join("\n") + (lines.length > 3 ? "..." : "");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <Layout>
      <div className="dashboard-section">
        <div className="dashboard-content">
          <div className="dashboard-profile">
            <div className="dashboard-profile-image">
              <img src="/profile.webp" alt="profile admin" draggable="false" />
            </div>
            <div className="dashboard-profile-info">
              <h1 className="profile-name">Alejandra Henao</h1>
              <h2 className="profile-email">
                alejandrahenaobedoya48@gmail.com
              </h2>
              <h2 className="profile-count">
                {getAllBlog.length} Publicaciones
              </h2>
            </div>
            <div className="dashboard-options">
              <Link to={"/createblog"} className="dashboard-button-container">
                <button className="dashboard-button">
                  <i className="fa-solid fa-plus" />
                  Crear publicación
                </button>
              </Link>
              <button
                className="dashboard-button close-button"
                onClick={logout}
              >
                <i className="fa-solid fa-power-off" />
                Cerrar sesión
              </button>
            </div>
          </div>
          <div className="blog-table-section">
            {loading ? (
              <Loader />
            ) : (
              <div className="dashboard-blogs-cards">
                {getAllBlog.length > 0 ? (
                  getAllBlog.map((item, index) => {
                    const { thumbnail, date, id } = item;
                    return (
                      <div key={index} className="dashboard-card">
                        <div
                          className="dashboard-card-image"
                          onClick={() => navigate(`/bloginfo/${id}`)}
                        >
                          <img
                            src={thumbnail}
                            alt="image post"
                            draggable="false"
                          />
                          <div className="dashboard-card-info">
                            <p className="dashboard-card-category">
                              #{item.blogs.category}
                            </p>
                            <p className="card-date">{date}</p>
                          </div>
                        </div>
                        <div className="dashboard-card-text">
                          <h1 className="dashboard-card-title">
                            {item.blogs.title}
                          </h1>
                          <div className="dashboard-card-description">
                            {parse(truncateContent(item.blogs.content))}
                          </div>
                          <DeleteConfirm id={id} deleteBlogs={deleteBlogs} />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="dashboard-not-found">
                    <img
                      src="/Empty-blogs.png"
                      alt="Sin blogs"
                      draggable="false"
                    />
                    <p>Todavía no hay publicaciones disponibles.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
