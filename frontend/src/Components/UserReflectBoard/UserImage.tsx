import React from 'react'

const UserImage = ({img}) => {
  return (
          <div
          className="overflow-hidden d-flex justify-content-center align-items-center"
          style={{ height: "100vh", width: "100vw" }}
        >
          <div
            className="border border-dark border-3 p-1 overflow-hidden"
            style={{ height: "98%", width: "98%" }}
          >
            <img
              src={img}
              alt="real time white board image"
              className="w-100 h-100"
            />
          </div>
        </div>
  )
}

export default UserImage
