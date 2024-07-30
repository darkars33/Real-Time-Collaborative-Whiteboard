import React, { useState } from "react";
import { GiArrowCursor } from "react-icons/gi";
import { RiRectangleLine } from "react-icons/ri";
import { FiCircle } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { IoMdDownload } from "react-icons/io";

const Whiteboard = () => {
  const [color, setColor] = useState<string>("#000000");
  console.log(color);

  const [action, setAction] = useState<string>("cursor");

  return (
    <div className="vw-100 vh-100 p-2  position-relative d-flex justify-content-center align-items-start">
      <div
        className="p-md-4 bg-white"
        style={{ position: "fixed", top: "20px" }}
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
          />
        </div>
      </div>
      <div className="p-1 bg-primary position-fixed rounded-lg" style={{ top: 20, right: 40, cursor:"pointer" }}>
        <h3 className="text-white">share</h3>
      </div>
      {/* <div className="p-3 bg-dark position-absolute" style={{ top: "50%", left: "50%", cursor:"pointer" }} >

      </div> */}
      
    </div>
  );
};

export default Whiteboard;
