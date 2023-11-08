import React from "react";

const CustomButton = ({ text, style, onClick }) => {
  const styles = {
    display: "flex",
    padding: "20px 140px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <button style={styles} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;
