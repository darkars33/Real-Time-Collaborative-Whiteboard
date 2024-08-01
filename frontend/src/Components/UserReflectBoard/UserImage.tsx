import React from 'react';

interface UserImageProps {
  img: string | null;
}

const UserImage: React.FC<UserImageProps> = ({ img }) => {
  return (
    <div
      className="overflow-hidden d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div
        className="border border-dark border-3 p-1 overflow-hidden"
        style={{ height: "98%", width: "98%" }}
      >
        {img ? (
          <img
            src={img}
            alt="real-time whiteboard image"
            className="w-100 h-100"
          />
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            No image available
          </div>
        )}
      </div>
    </div>
  );
};

export default UserImage;
