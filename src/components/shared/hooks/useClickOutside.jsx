import { useRef, useEffect } from "react";

export const useClickOutside = callback => {
  const wrapperRef = useRef(null); // Ref of the form

  /**
   * Hide the form when clicked outside of it
   * @param event the click
   */
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      callback();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return wrapperRef;
};
