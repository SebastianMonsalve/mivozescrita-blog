import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import Comment from "../../components/comment/Comment";
import toast from "react-hot-toast";
import "./BlogInfo.css";

function BlogInfo() {
  const context = useContext(myContext);
  const { loading, setloading } = context;

  const params = useParams();

  const [getBlogs, setGetBlogs] = useState();

  const getAllBlogs = async () => {
    setloading(true);
    try {
      const productTemp = await getDoc(doc(fireDb, "blogPost", params.id));
      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
      } else {
        console.log("Document does not exist");
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  function createMarkup(c) {
    return { __html: c };
  }

  const [fullName, setFullName] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const commentRef = collection(
      fireDb,
      "blogPost/" + `${params.id}/` + "comment"
    );
    try {
      await addDoc(commentRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success("Comentario publicado con éxito");
      setFullName("");
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  const [allComment, setAllComment] = useState([]);

  const getcomment = async () => {
    try {
      const q = query(
        collection(fireDb, "blogPost/" + `${params.id}/` + "comment/"),
        orderBy("time")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(productsArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcomment();
    window.scrollTo(0, 0);
  }, [loading]);

  return (
    <Layout>
      <section className="blog-info">
        {loading ? (
          <Loader />
        ) : (
          <div className="blog-info-container">
            <h1 className="blog-info-title">{getBlogs?.blogs?.title}</h1>
            <div className="card-blog-info">
              <div className="blog-info-image">
                <img
                  alt="content"
                  src={getBlogs?.thumbnail}
                  draggable="false"
                />
              </div>
              <div className="blog-info-content">
                <div className="blog-info-info">
                  <div className="blog-info-admin">
                    <img src="/profile.webp" alt="profile" draggable="false" />
                    <p className="blog-info-created">
                      Creado por Alejandra Henao
                    </p>
                  </div>
                  <div className="blog-info-more">
                    <div className="blog-info-date">
                      <i className="fa-regular fa-clock" />
                      <p>Publicado en {getBlogs?.date}</p>
                    </div>
                    <p className="blog-info-category">
                      #{getBlogs?.blogs?.category}
                    </p>
                  </div>
                </div>

                <div
                  className="blog-info-text"
                  dangerouslySetInnerHTML={createMarkup(
                    getBlogs?.blogs?.content
                  )}
                ></div>
              </div>
            </div>
          </div>
        )}
        <Comment
          addComment={addComment}
          commentText={commentText}
          setcommentText={setCommentText}
          allComment={allComment}
          fullName={fullName}
          setFullName={setFullName}
        />
      </section>
    </Layout>
  );
}

export default BlogInfo;
