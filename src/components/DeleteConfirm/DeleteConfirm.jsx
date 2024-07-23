import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import "./DeleteConfirm.css";

export default function DeleteConfirm({ id, deleteBlogs }) {
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

  return (
    <Fragment>
      <button
        className="dasboard-button-delete"
        onClick={handleOpen}
        title="Eliminar"
      >
        <i className="fa-regular fa-trash-can" />
        Eliminar
      </button>
      <Dialog className="delete-modal" open={open} handler={handleOpen}>
        <DialogBody className="delete-modal-container" ref={modalContainerRef}>
          <div className="delete-close-modal" onClick={handleOpen}>
            <i className="fa-solid fa-xmark" />
          </div>
          <div className="delete-modal-icon">
            <i className="fa-solid fa-triangle-exclamation" />
          </div>
          <h1 className="delete-modal-title">Confirmar eliminación</h1>
          <div className="delete-line"></div>
          <p className="delete-modal-description">
            ¿Estás segura de que deseas eliminar esta publicación? Esta acción
            no se puede deshacer.
          </p>
          <div class="delete-modal-actions">
            <button
              className="delete-button cancel-button"
              onClick={handleOpen}
            >
              Cancelar
            </button>
            <button
              className="delete-button confirm-button"
              onClick={() => {
                deleteBlogs(id);
                handleOpen();
              }}
            >
              <i className="fa-regular fa-trash-can" />
              Eliminar
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}
