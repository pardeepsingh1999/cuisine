import React from "react";
import { useSelector } from "react-redux";
import { Dna } from "react-loader-spinner";

const FullPageLoader = () => {
  const loaderData = useSelector((state) => state?.loaderData);

  if (!loaderData?.isVisible) {
    return <></>;
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center fixed opacity-60 bg-current z-50">
      <div>
        <Dna
          visible={true}
          ariaLabel="dna-loading"
          wrapperStyle={{
            margin: "auto",
          }}
        />

        {loaderData?.loaderText ? (
          <div className="text-xl sm:text-3xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              {loaderData?.loaderText}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FullPageLoader;
