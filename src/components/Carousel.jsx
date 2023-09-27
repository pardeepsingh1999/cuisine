import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const Carousel = ({ data }) => {
  if (!data?.length) return <></>;

  return (
    <>
      <AwesomeSlider bullets={false}>
        {data.map((each) => (
          <div key={each.id} data-src={each.image_url}>
            <div className="absolute inset-x-[15%] bottom-5 p-2 text-center bg-base-100 bg-opacity-60 rounded-xl">
              <h5 className="text-sm md:text-xl font-semibold">{each.title}</h5>
            </div>
          </div>
        ))}
      </AwesomeSlider>
    </>
  );
};

export default Carousel;
