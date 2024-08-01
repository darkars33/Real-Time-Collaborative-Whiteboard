import React from "react";

interface ShareProps {
  shareId: string;
}

const Share: React.FC<ShareProps> = ({ shareId }) => {
  return (
    <div className="input-group d-flex align-items-center justify-content-center mt-5 w-100">
      <input
        type="text"
        className="form-control my-2 w-100"
        disabled
        placeholder="Generate room code"
        value={shareId}
      />
      <div className="input-group-append d-flex gap-1">
        <button className="btn btn-outline-success btn-sm" type="button">
          Copy
        </button>
      </div>
    </div>
  );
};

export default Share;
