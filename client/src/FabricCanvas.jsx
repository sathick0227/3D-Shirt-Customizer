import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current);
    fabricCanvas.setHeight(600);
    fabricCanvas.setWidth(800);
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  var text = new fabric.Text("hello world", { left: 100, top: 100 });
  canvas?.add(text);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.set({
          left: 100,
          top: 100,
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true,
        });
        canvas.add(img);
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <form>
        <label htmlFor="myfile">Select a file:</label>
        <input type="file" id="myfile" onChange={handleImageUpload} />

        <canvas ref={canvasRef} id="fabric-canvas" />
      </form>
    </div>
  );
};

export default FabricCanvas;
