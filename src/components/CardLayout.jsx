import React from "react";

const CardLayout = ({ children }) => {
  return (
    <>
      <div className="card max-w-sm md:max-w-3xl md:card-side bg-base-100 shadow-xl mx-auto mb-5">
        {children}
      </div>
    </>
  );
};

export default CardLayout;
