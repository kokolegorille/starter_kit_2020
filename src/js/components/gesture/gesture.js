import React, { useEffect, useRef, useState } from "react";

// https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
const isTouchDevice = "ontouchstart" in window || "onmsgesturechange" in window;

let move, setMove;

const Gesture = ({
  handleDrag, handleWheel, 
  handleStatus, children
}) => {
  const gestureRef = useRef();
  [move, setMove] = useState({});

  // holds x, y from touch or mouse devices
  let cx, cy;

  // Drag and zoom
  useEffect(() => {
    const current = gestureRef.current;
    if (current) {
      if (isTouchDevice) {
        current.addEventListener("touchstart", doTouchStart, false);
        
      } else {
        current.addEventListener("mousedown", doMouseDown, false);
        current.addEventListener("wheel", doWheel, false);
      }
    }
    return () => {
      if (isTouchDevice) {
        current.removeEventListener("touchstart", doTouchStart, false);

      } else {
        current.removeEventListener("mousedown", doMouseDown, false);
        current.removeEventListener("wheel", doWheel, false);
      }
    }
  }, []);

  // Try to detect one finger drag, or 2 fingers pinch
  const doTouchStart = e => {
    if (e.touches.length == 1) {
      doMouseDown(e);
    } else if (e.touches.length == 2) {
      console.log(`Touch event with ${e.touches.length} fingers is not (yet) implemented!`);
    } else {
      console.log(`Touch event with ${e.touches.length} fingers is not implemented!`);
    }
  }

  const doMouseDown = e => {
    // console.log("MOUSE DOWN")

    const current = gestureRef.current;
    if (isTouchDevice) {
      cx = e.touches[0].clientX;
      cy = e.touches[0].clientY;
      current.addEventListener("touchend", doMouseUp, false);
      current.addEventListener("touchcancel", doMouseUp, false);
      current.addEventListener("touchmove", doMouseMove, false);
    } else {
      cx = e.clientX;
      cy = e.clientY;
      current.addEventListener("mouseup", doMouseUp, false);
      current.addEventListener("mouseout", doMouseUp, false);
      current.addEventListener("mousemove", doMouseMove, false);
    }
    setMove({x: cx, y: cy});
    handleStatus("drag");
  }

  const doMouseUp = e => {
    // console.log("MOUSE UP")

    handleStatus("off");

    const current = gestureRef.current;
    if (isTouchDevice) {
      current.removeEventListener("touchend", doMouseUp, false);
      current.removeEventListener("touchcancel", doMouseUp, false);
      current.removeEventListener("touchmove", doMouseMove, false);
    } else {
      current.removeEventListener("mouseup", doMouseUp, false);
      current.removeEventListener("mouseout", doMouseUp, false);
      current.removeEventListener("mousemove", doMouseMove, false);
    }
  }

  const doMouseMove = e => {
    cx = isTouchDevice ? e.touches[0].clientX : e.clientX
    cy = isTouchDevice ? e.touches[0].clientY : e.clientY

    const deltaX = move.x - cx;
    const deltaY = move.y - cy;
    handleStatus("move");
    
    // Setting the move here will give movement relative to previous coordinate!
    setMove({x: cx, y: cy});
    handleDrag({deltaX, deltaY});
  }

  // It is not possible to detect wheel stop
  // One way is to use a timer...
  const doWheel = e => handleWheel(e.deltaY);

  return (
    <div ref={gestureRef}>
      {children}
    </div>
  )
}

export default Gesture;