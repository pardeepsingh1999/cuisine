import React from "react";

const AboutCard = ({ data }) => {
  return (
    <div className="card max-w-sm md:max-w-3xl md:card-side bg-base-100 shadow-xl mx-auto mb-5">
      {data?.isShowImageLeftSide && (
        <figure className="p-5">
          <img src={data?.image_url} alt="thumbnail" className="rounded-xl" />
        </figure>
      )}

      <div className="card-body p-5">
        <h2 className="card-title">{data?.title}</h2>
        <p>{data?.content}</p>
      </div>

      {data?.isShowImageRightSide && (
        <figure className="p-5">
          <img src={data?.image_url} alt="thumbnail" className="rounded-xl" />
        </figure>
      )}
    </div>
  );
};

export default AboutCard;
