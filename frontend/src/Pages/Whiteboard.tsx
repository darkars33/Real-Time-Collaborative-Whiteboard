import React, { useState, useRef, useEffect } from "react";
import { PiCursorLight, PiRectangleLight, PiCircleThin, PiArrowLeft } from "react-icons/pi";
import { IoIosClose, IoMdDownload } from "react-icons/io";
import { RiUserShared2Fill } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { Arrow, Circle, Layer, Line, Rect, Stage, Transformer } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import CurrentUser from "../Components/CurrentUser/CurrentUser";
import UserImage from "../Components/UserReflectBoard/UserImage";
import Share from "../Components/Forms/Share";

export interface User {
  name: string;
  roomId: string;
  userId: string;
  host: boolean;
  presenter: boolean;
}

interface WhiteboardProps {
  user: User;
  socket: any; 
}

const Whiteboard: React.FC<WhiteboardProps> = ({ user, socket }) => {
  const [color, setColor] = useState<string>("#000000");
  const strokeColor = "#000000";
  const isPainting = useRef<boolean>(false);
  const currentShapeId = useRef<string | undefined>(undefined);
  const transformerRef = useRef<any>(null);
  const [action, setAction] = useState<string>("cursor");

  const [rectangles, setRectangles] = useState<Array<any>>([]);
  const [circles, setCircles] = useState<Array<any>>([]);
  const [arrows, setArrows] = useState<Array<any>>([]);
  const [pencil, setPencil] = useState<Array<any>>([]);
  const [img, setImg] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(user);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showUser, setShowUser] = useState<boolean>(false);

  

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    socket.on("whiteBoardDataResponse", (data: { imgURL: string }) => {
      setImg(data.imgURL);
    });

    socket.on("updateImage", (imageURL: string) => {
      setImg(imageURL);
    });
  }, [socket]);

  const isDragable = action === "cursor";

  const stageRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
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
    if (action === "cursor" || !isPainting.current) return;

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
                radius: Math.sqrt((y - c.y) ** 2 + (x - c.x) ** 2),
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

    const stageImage = stageRef.current?.toDataURL();
    socket.emit("stageImage", stageImage);
  };

  const handleClick = (e: any) => {
    if (action !== "cursor") return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  };

  const handleExport = () => {
    const uri = stageRef.current?.toDataURL();
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = uri || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (stageRef.current) {
        const stageImage = stageRef.current?.toDataURL();
        socket.emit("stageImage", stageImage);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [socket]);

  return (
    <>
      {currentUser?.presenter && (
        <div className="vw-100 vh-100 position-relative d-flex justify-content-center align-items-start overflow-hidden">
          <div
            className="p-md-4 bg-transparent"
            style={{ position: "fixed", zIndex: 10, top: 0 }}
            draggable={isDragable}
          >
            <div
              className="d-flex justify-content-between border p-2 shadow gap-2 flex-wrap align-items-center"
              style={{ borderRadius: "10px" }}
            >
              <PiCursorLight
                className={`mx-2 mx-md-3 p-2 rounded`}
                size={30}
                onClick={() => setAction("cursor")}
                style={{
                  cursor: "pointer",
                  backgroundColor: `${action === "cursor" ? "#eadbf6" : ""}`,
                }}
              />
              <PiRectangleLight
                className={`mx-2 mx-md-3 p-2 rounded`}
                size={30}
                onClick={() => setAction("rectangle")}
                style={{
                  cursor: "pointer",
                  backgroundColor: `${action === "rectangle" ? "#eadbf6" : ""}`,
                }}
              />
              <PiCircleThin
                className={`mx-2 mx-md-3 p-2 rounded`}
                size={33}
                onClick={() => setAction("circle")}
                style={{
                  cursor: "pointer",
                  backgroundColor: `${action === "circle" ? "#eadbf6" : ""}`,
                }}
              />
              <PiArrowLeft
                className={`mx-2 mx-md-3 p-1 rounded`}
                size={30}
                onClick={() => setAction("arrow")}
                style={{
                  cursor: "pointer",
                  backgroundColor: `${action === "arrow" ? "#eadbf6" : ""}`,
                }}
              />
              <GoPencil
                className={`mx-2 mx-md-3 p-2 rounded`}
                size={30}
                onClick={() => setAction("pencil")}
                style={{
                  cursor: "pointer",
                  backgroundColor: `${action === "pencil" ? "#eadbf6" : ""}`,
                }}
              />
              <input
                type="color"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "15px",
                  cursor: "pointer",
                }}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <IoMdDownload
                className="mx-2 mx-md-3 p-2 rounded"
                size={30}
                style={{ cursor: "pointer" }}
                onClick={handleExport}
              />
            </div>
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

          <button
            className="p-2 position-absolute rounded-lg border-0 text-white share-button"
            style={{
              top: 20,
              right: 40,
              cursor: "pointer",
              zIndex: 10,
              backgroundColor: "#c29fff",
            }}
            onClick={() => setShowShare(!showShare)}
          >
            share
          </button>

          {showShare && (
            <div className="p-2 position-absolute" style={{ top: "10%", right: 10, zIndex: 1000 }}>
              <div className="p-2 border rounded position-relative border p-2 shadow gap-2">
                <IoIosClose
                  className="position-absolute"
                  size={30}
                  style={{ right: 10, cursor: "pointer", zIndex: 10 }}
                  onClick={() => setShowShare(false)}
                />
                <Share shareId={currentUser.roomId} />
              </div>
            </div>
          )}

          <div className="position-absolute" style={{ left: 20, top: 30 }}>
            <RiUserShared2Fill
              className="p-1 border text-white"
              size={35}
              style={{ backgroundColor: "#c29fff", borderRadius: "10px" }}
              onClick={() => setShowUser(!showUser)}
            />
            {showUser && <CurrentUser presentUser={currentUser} />}
          </div>
        </div>
      )}
      {!currentUser?.presenter && <UserImage img={img} />}
    </>
  );
};

export default Whiteboard;
