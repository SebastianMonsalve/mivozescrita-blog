import React, { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import "./Comment.css";

function Comment({
  addComment,
  commentText,
  setcommentText,
  allComment,
  fullName,
  setFullName,
}) {
  const textareaRef = useRef(null);
  const pickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      commentText.slice(0, start) + emoji.native + commentText.slice(end);
    setcommentText(newText);
    textarea.focus();
    textarea.setSelectionRange(
      start + emoji.native.length,
      start + emoji.native.length
    );
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmojiButtonClick = (event) => {
    event.stopPropagation();
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <section className="comment-section">
      <div className="comment-container">
        <div className="comment-title">
          <h3>{`${allComment.length} comentarios`}</h3>
          <div className="comment-line"></div>
        </div>
        <form className="comment-inputs" onSubmit={(e) => e.preventDefault()}>
          <div className="comment-input-name">
            <i className="fa-regular fa-user" />
            <input
              type="text"
              placeholder="Coloca tu nombre"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="comment-line-inputs"></div>
          <div className="comment-input-description">
            <i className="fa-regular fa-comment-dots" />
            <textarea
              id="comment"
              ref={textareaRef}
              value={commentText}
              onChange={(e) => setcommentText(e.target.value)}
              placeholder="Haz un comentario"
            />
            <div className="emojis" onClick={handleEmojiButtonClick}>
              <i className="fa-regular fa-face-laugh-beam" />
            </div>
            {showEmojiPicker && (
              <div
                ref={pickerRef}
                style={{ position: "absolute", zIndex: 1000 }}
              >
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
            <button
              className={`comment-button-container ${
                !commentText.trim() ? "disabled-button" : ""
              }`}
              onClick={addComment}
              disabled={!commentText.trim()}
            >
              Publicar
            </button>
          </div>
        </form>

        <article>
          {allComment
            .slice()
            .reverse()
            .map((item, index) => {
              const { fullName, date, commentText } = item;
              return (
                <React.Fragment key={index}>
                  <div className="comment">
                    <div className="comment-info">
                      <i className="fa-solid fa-user" />
                      <p className="comment-name">{fullName}</p>
                      <p className="comment-date">{date}</p>
                    </div>
                    <p className="comment-text">{commentText}</p>
                  </div>
                </React.Fragment>
              );
            })}
        </article>
      </div>
    </section>
  );
}

export default Comment;
