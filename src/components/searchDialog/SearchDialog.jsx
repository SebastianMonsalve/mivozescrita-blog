import { Fragment, useContext, useState, useRef, useEffect } from "react";
import { Dialog, DialogBody, Input } from "@material-tailwind/react";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router";
import "./SearchDialog.css";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const modalContainerRef = useRef(null);

  const handleOpen = () => setOpen(!open);

  const handleClickOutside = (event) => {
    if (
      modalContainerRef.current &&
      !modalContainerRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const context = useContext(myContext);
  const { searchkey, setSearchkey, getAllBlog } = context;

  const navigate = useNavigate();

  const filteredBlogs = getAllBlog.filter(
    (obj) =>
      obj.blogs &&
      (obj.blogs.category.toLowerCase().includes(searchkey.toLowerCase()) ||
        obj.blogs.title.toLowerCase().includes(searchkey.toLowerCase()))
  );

  return (
    <Fragment>
      <div onClick={handleOpen} title="Buscar blog">
        <i className="fa-solid fa-magnifying-glass" />
      </div>
      <Dialog className="modal" open={open} handler={handleOpen}>
        <DialogBody className="modal-container" ref={modalContainerRef}>
          <div className="close-modal" onClick={handleOpen}>
            <i className="fa-solid fa-xmark" />
          </div>
          <h1 className="modal-title">Buscar publicaciones</h1>
          <div className="modal-line"></div>
          <p className="modal-description">
            En este apartado, puedes buscar publicaciones filtrándolas por
            categoría o buscando directamente por su título.
          </p>
          <div className="input-container">
            <i className="fa-solid fa-magnifying-glass" />
            <Input
              color="white"
              type="search"
              placeholder="Escriba en este campo"
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              className="input"
              name="searchkey"
            />
          </div>

          <div className="modal-card-container">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((item, index) => (
                <div
                  key={index}
                  className="modal-card"
                  onClick={() => navigate(`/bloginfo/${item.id}`)}
                >
                  <div className="modal-card-image">
                    <img src={item.thumbnail} alt="blog" draggable="false" />
                    <div className="modal-card-content">
                      <p className="modal-card-admin">#{item.blogs.category}</p>
                    </div>
                  </div>
                  <h1 className="modal-card-title">{item.blogs.title}</h1>
                  <p className="modal-card-date">{item.date}</p>
                </div>
              ))
            ) : (
              <div className="all-not-found">
                <img src="/Empty-blogs.png" alt="Sin blogs" draggable="false" />
                <p>Todavía no hay publicaciones disponibles.</p>
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}
