import React from "react";

const FaceComponents = ({
  handleImageChange,
  submitHandler,
}) => {
  return (
    <>
        <div className="col-md-6 col-12 mt-2">
          <div className="input">
            <h2>Upload Targetted Image</h2>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              accept=".jpg, .jpeg, .png, .webp"
              id="image"
              name="image"
            />
          </div>
          <button
            className="btn_style"
            name="submit"
            onClick={() => submitHandler()}
          >
            <span>Process Now</span>
          </button>
        </div>
    </>
  );
};

export default FaceComponents;
