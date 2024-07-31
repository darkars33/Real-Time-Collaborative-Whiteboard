import React, { useState, useRef } from "react";
import { GiArrowCursor } from "react-icons/gi";
import { RiRectangleLine } from "react-icons/ri";
import { FiCircle } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { IoMdDownload } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import {
  Arrow,
  Circle,
  Layer,
  Line,
  Rect,
  Stage,
  Transformer,
} from "react-konva";
import { v4 as uuidv4 } from "uuid";
import CurrentUser from "../Components/CurrentUser/CurrentUser";

const Whiteboard = () => {
  const [color, setColor] = useState<string>("#000000");
  const strokeColor = "#000000";
  const isPainting = useRef<boolean>();
  const currentShapeId = useRef<string | undefined>();
  const transformerRef = useRef<any>(null);
  console.log(color);

  const [action, setAction] = useState<string>("cursor");

  const [rectangles, setRectangles] = useState<any[]>([]);
  const [circles, setCircles] = useState<any[]>([]);
  const [arrows, setArrows] = useState<any[]>([]);
  const [pencil, setPencil] = useState<any[]>([]);

  const isDragable = action === "cursor";

  const stageRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({
    width: 1500,
    height: 760,
  });

  const onPointerDown = () => {
    if (action === "cursor") return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    const id = uuidv4();

    currentShapeId.current = id;
    isPainting.current = true;

    switch (action) {
      case "rectangle":
        setRectangles((rect) => [
          ...rect,
          {
            id,
            x,
            y,
            height: 20,
            width: 20,
            fillColor: color,
          },
        ]);
        break;
      case "circle":
        setCircles((cir) => [
          ...cir,
          {
            id,
            x,
            y,
            radius: 20,
            fillColor: color,
          },
        ]);
        break;
      case "arrow":
        setArrows((arr) => [
          ...arr,
          {
            id,
            points: [x, y, x + 20, y + 20],
            fillColor: color,
          },
        ]);
        break;
      case "pencil":
        setPencil((pen) => [
          ...pen,
          {
            id,
            points: [x, y],
            fillColor: color,
          },
        ]);
        break;
    }
  };

  const onPointerMove = () => {
    if (action === "cursor" || !isPainting) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case "rectangle":
        setRectangles((rect) =>
          rect.map((r) => {
            if (r.id === currentShapeId.current) {
              return {
                ...r,
                width: x - r.x,
                height: y - r.y,
              };
            }
            return r;
          })
        );
        break;

      case "circle":
        setCircles((cir) =>
          cir.map((c) => {
            if (c.id === currentShapeId.current) {
              return {
                ...c,
                radius: ((y - c.y) ** 2 + (x - c.x) ** 2) ** 0.5,
              };
            }
            return c;
          })
        );
        break;
      case "arrow":
        setArrows((arr) =>
          arr.map((a) => {
            if (a.id === currentShapeId.current) {
              return {
                ...a,
                points: [a.points[0], a.points[1], x, y],
              };
            }
            return a;
          })
        );
        break;
      case "pencil":
        setPencil((pen) =>
          pen.map((p) => {
            if (p.id === currentShapeId.current) {
              return {
                ...p,
                points: [...p.points, x, y],
              };
            }
            return p;
          })
        );
    }
  };

  const onPointerUp = () => {
    isPainting.current = false;
    currentShapeId.current = undefined;
  };

  const handleClick = (e: any) => {
    if (action !== "cursor") return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  };

  const handleExport = () => {
    const uri = stageRef.current?.toDataURL();
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="vw-100 vh-100 p-2 position-relative d-flex justify-content-center align-items-start overflow-hidden">
  <div
    className="p-md-4 bg-transparent"
    style={{ position: "fixed", top: "20px", zIndex: 10 }}
    draggable={isDragable}
  >
    <div
      className="d-flex justify-content-between p-2 rounded-lg shadow gap-2 flex-wrap"
      style={{ border: "1px solid gray" }}
    >
      <GiArrowCursor
        className={`mx-2 mx-md-3 p-1 rounded ${
          action === "cursor" ? "bg-primary" : ""
        }`}
        size={30}
        onClick={() => setAction("cursor")}
        style={{ cursor: "pointer" }}
      />
      <RiRectangleLine
        className={`mx-2 mx-md-3 p-1 rounded ${
          action === "rectangle" ? "bg-primary" : ""
        }`}
        size={30}
        onClick={() => setAction("rectangle")}
        style={{ cursor: "pointer" }}
      />
      <FiCircle
        className={`mx-2 mx-md-3 p-1 rounded ${
          action === "circle" ? "bg-primary" : ""
        }`}
        size={30}
        onClick={() => setAction("circle")}
        style={{ cursor: "pointer" }}
      />
      <FaLongArrowAltRight
        className={`mx-2 mx-md-3 p-1 rounded ${
          action === "arrow" ? "bg-primary" : ""
        }`}
        size={30}
        onClick={() => setAction("arrow")}
        style={{ cursor: "pointer" }}
      />
      <GoPencil
        className={`mx-2 mx-md-3 p-1 rounded ${
          action === "pencil" ? "bg-primary" : ""
        }`}
        size={30}
        onClick={() => setAction("pencil")}
        style={{ cursor: "pointer" }}
      />
      <input
        type="color"
        style={{ width: "25px", marginLeft: "15px", cursor: "pointer" }}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <IoMdDownload
        className="mx-2 mx-md-3 p-1 rounded"
        size={30}
        style={{ cursor: "pointer" }}
        onClick={handleExport}
      />
    </div>
  </div>
  <div
    className="p-2 bg-primary position-absolute rounded-lg"
    style={{ top: 20, right: 40, cursor: "pointer", zIndex: 10 }}
  >
    <FaShare size={30} className="text-white" />
  </div>

  <Stage
    ref={stageRef}
    width={window.innerWidth}
    height={window.innerHeight}
    onPointerMove={onPointerMove}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
  >
    <Layer>
      <Rect
        x={0}
        y={0}
        width={window.innerWidth}
        height={window.innerHeight}
        fill="#fff"
        id="bg"
        draggable={isDragable}
        onClick={() => transformerRef.current.nodes([])}
      />

      {rectangles.map((rect) => (
        <Rect
          key={rect.id}
          x={rect.x}
          y={rect.y}
          stroke={strokeColor}
          strokeWidth={2}
          fill={rect.fillColor}
          height={rect.height}
          width={rect.width}
          draggable={isDragable}
          onClick={handleClick}
        />
      ))}

      {circles.map((cir) => (
        <Circle
          key={cir.id}
          x={cir.x}
          y={cir.y}
          radius={cir.radius}
          stroke={strokeColor}
          strokeWidth={2}
          fill={cir.fillColor}
          draggable={isDragable}
          onClick={handleClick}
        />
      ))}

      {arrows.map((arr) => (
        <Arrow
          key={arr.id}
          points={arr.points}
          stroke={strokeColor}
          strokeWidth={2}
          fill={arr.fillColor}
          draggable={isDragable}
          onClick={handleClick}
        />
      ))}

      {pencil.map((pen) => (
        <Line
          key={pen.id}
          lineCap="round"
          lineJoin="round"
          points={pen.points}
          stroke={strokeColor}
          strokeWidth={2}
          fill={pen.fillColor}
          draggable={isDragable}
          onClick={handleClick}
        />
      ))}

      <Transformer ref={transformerRef} />
    </Layer>
  </Stage>

  <div className="position-absolute" style={{ left: 20 }}>
    <CurrentUser />
  </div>
</div>

  );
};

export default Whiteboard;
