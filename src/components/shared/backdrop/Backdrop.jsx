import React from "react";

export const Backdrop = ({ children }) => {
  const styles = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)"
  };

  return <div style={styles}>{children}</div>;
};
