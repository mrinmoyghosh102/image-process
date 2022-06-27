import React from "react";

const Outputs = ({ source }) => {
    return (
        <>
            <div className="col-md-6 col-12">
                <div className="card">
                    <h2>Targeted Image</h2>
                    {source.image ? (
                        <img src={source.image} alt="" />
                    ) : (
                        <p>Upload Targeted Image First</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Outputs;
