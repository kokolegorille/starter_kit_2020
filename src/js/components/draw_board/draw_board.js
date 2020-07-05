import React, { useRef, useEffect, useState } from "react";

import useCanvas from "./use_canvas";

let state, actions, 
  current, setCurrent, shapes, setShapes,
  ratio, size;

const DrawBoard = () => {
  const canvasRef = useRef();
  const resizeRef = useRef();
  
  // BE CAREFUL OF WHERE YOU DEFINE SIZE! IMPORTANT!
  [state, actions] = useCanvas();
  size = state.size;

  ratio = state.size.width / 800;
  console.log("RATIO: ", ratio, state.size.width);

  // Store current drawing line
  [current, setCurrent] = useState([]);
  // Store shapes
  [shapes, setShapes] = useState([]);

  useEffect(() => {
    console.log("MOUNT");
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousedown", doMouseDown, false);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      console.log("UNMOUNT");
      canvasRef.current.removeEventListener("mousedown", doMouseDown, false);
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  const handleResize = () => {
    const width = resizeRef.current.clientWidth;

    // Calculate height from 800x600 ratio
    const height = 6 * width / 8;
    console.log("RESIZE", height, width);
    actions.setSize({height, width});

    redraw();
  }

  const doMouseDown = e => {
    console.log("DOWN");

    actions.setStatus("drawing");
    actions.setPosXY(findXY(e));

    canvasRef.current.addEventListener("mouseup", doMouseUp, false);
    canvasRef.current.addEventListener("mousemove", doMouseMove, false);
    canvasRef.current.addEventListener("mouseout", doMouseUp, false);
  }

  const doMouseUp = () => {
    console.log("UP");
    actions.setStatus("standby");

    if (current.length > 0) {
      // Store current in shapes, then reset
      const {lineCap, lineWidth, strokeStyle, fillStyle} = state;
      const pen = {lineWidth, lineCap, strokeStyle, fillStyle};
      const shape = {shape: "line", pen, segments: current};
      setShapes([...shapes, shape]);
      setCurrent([]);
    }

    canvasRef.current.removeEventListener("mouseup", doMouseUp, false);
    canvasRef.current.removeEventListener("mousemove", doMouseMove, false);
    canvasRef.current.removeEventListener("mouseout", doMouseUp, false);
  }

  const doMouseMove = e => {
    // Destructure state HERE! IMPORTANT!
    const {posXY, lineCap, lineWidth, strokeStyle} = state;
    const {x, y} = findXY(e);



    const from = posXY;
    const to = {x, y};
    const pen = {lineWidth, lineCap, strokeStyle};
    
    const drawParams = {from, to, pen}

    // Store in current
    // setCurrent([...current, {from: resizeXY(from), to: resizeXY(to)}]);
    setCurrent([...current, {from, to}]);

    draw(drawParams);

    actions.setPosXY({x, y});
  }

  const draw = params => {
    const {from, to, pen} = params;

    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath(); // begin

    ctx.lineWidth = pen.lineWidth;
    ctx.lineCap = pen.lineCap;
    ctx.strokeStyle = pen.strokeStyle;

    ctx.moveTo(from.x, from.y); // from
    ctx.lineTo(to.x, to.y); // to
    ctx.stroke(); // draw it!
  }
  
  const findXY = e => (
    { 
      x: e.pageX - canvasRef.current.offsetLeft, 
      y: e.pageY - canvasRef.current.offsetTop 
    }
  )

  // const resizeXY = ({x, y}) => ({x: x * ratio, y: y * ratio});

  // Redraw after resize from stored shapes
  const redraw = () => {
    shapes.forEach(shape => {
      shape.segments.forEach(segment => draw({
        from: segment.from,
        to: segment.to,
        pen: shape.pen
      }))
    });
  };

  console.log("SHAPES: ", shapes)

  // Changing the size of the canvas will clear content!
  // Unless You redraw shapes
  return (
    <div ref={resizeRef} style={{cursor: "crosshair"}}>
      <canvas 
        id="draw-board"
        ref={canvasRef}
        width={size.width} 
        height={size.height} 
         />
    </div>
  );
};

export default DrawBoard;