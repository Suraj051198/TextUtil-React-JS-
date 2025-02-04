import React, { useState } from "react";

const TextForm = (props) => {
  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to Uppercase", "success");
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to Lowercase", "success");
  };

  const handleClearClick = () => {
    setText("");
    props.showAlert("Text cleared", "success");
  };

  const handleExtraSpaces = () => {
    setText(text.split(/[ ]+/).join(" ").trim());
    props.showAlert("Extra spaces removed", "success");
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        props.showAlert("Text copied!", "success");
      });
    } else {
      document.execCommand("copy");
      props.showAlert("Fallback: Text copied!", "success");
    }
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");

  const wordCount = text.split(/\s+/).filter((word) => word).length;
  const isTextEmpty = text.trim().length === 0;

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>{props.heading}</h1>
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          style={{
            backgroundColor: props.mode === "dark" ? "grey" : "white",
            color: props.mode === "dark" ? "white" : "#042743",
          }}
          rows="8"
          placeholder="Enter your text here..."
        ></textarea>
        <button
          className="btn btn-primary my-2"
          onClick={handleUpClick}
          disabled={isTextEmpty}
        >
          Convert to Uppercase
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={handleLoClick}
          disabled={isTextEmpty}
        >
          Convert to Lowercase
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={handleClearClick}
          disabled={isTextEmpty}
        >
          Clear Text
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={handleCopy}
          disabled={isTextEmpty}
        >
          Copy Text
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={handleExtraSpaces}
          disabled={isTextEmpty}
        >
          Remove Extra Spaces
        </button>
        <div className="container mt-4">
          <h2>Your Text Summary</h2>
          <p>
            {wordCount} Words and {text.length} Characters
          </p>
          <p>{(0.008 * wordCount).toFixed(2)} Minutes Read</p>
          <h2 className="mt-4">Preview</h2>
          <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
        </div>
      </div>
    </>
  );
};

export default TextForm;
