import React from "react";
import CardLayout from "./CardLayout";

const AboutCard = ({
  data,
  isShowImageLeftSide = false,
  isShowImageRightSide = false,
}) => {
  return (
    <>
      <CardLayout>
        {isShowImageLeftSide && (
          <figure className="p-5">
            <img src={data?.image_url} alt="thumbnail" className="rounded-xl" />
          </figure>
        )}

        <div className="card-body p-5">
          <h2 className="card-title">{data?.title}</h2>
          <p className="text-justify">{data?.content}</p>
        </div>

        {isShowImageRightSide && (
          <figure className="p-5">
            <img src={data?.image_url} alt="thumbnail" className="rounded-xl" />
          </figure>
        )}
      </CardLayout>
    </>
  );
};

export default AboutCard;
