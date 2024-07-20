import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function MyState(props) {
  const [searchkey, setSearchkey] = useState("");
  const [loading, setloading] = useState(false);
  const [getAllBlog, setGetAllBlog] = useState([]);

  function getAllBlogs() {
    setloading(true);
    try {
      const q = query(collection(fireDb, "blogPost"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let blogArray = [];
        QuerySnapshot.forEach((doc) => {
          blogArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllBlog(blogArray);
        setloading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  const deleteBlogs = async (id) => {
    try {
      await deleteDoc(doc(fireDb, "blogPost", id));
      getAllBlogs();
      toast.success("Tu publicación ha sido eliminada correctamente.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MyContext.Provider
      value={{
        searchkey,
        setSearchkey,
        loading,
        setloading,
        getAllBlog,
        deleteBlogs,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
