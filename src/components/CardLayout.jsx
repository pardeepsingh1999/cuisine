import React from "react";

const CardLayout = ({ children }) => {
  return (
    <>
      <div className="card max-w-sm sm:max-w-xl md:max-w-4xl sm:card-side bg-base-100 shadow-xl mx-auto mb-5">
        {children}
      </div>
    </>
  );
};

export default CardLayout;
