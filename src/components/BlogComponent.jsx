import React from "react";
import { useNavigate } from "react-router-dom";

const BlogComponent = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card max-w-sm md:max-w-3xl md:card-side bg-base-100 shadow-xl mx-auto mb-5">
        {blog?.isShowImageLeftSide && (
          <figure className="p-5">
            <img src={blog?.image_url} alt="thumbnail" className="rounded-xl" />
          </figure>
        )}

        <div className="card-body p-5">
          <h2 className="card-title">{blog?.title}</h2>
          <p className="">{blog?.content}</p>

          <div className="card-actions justify-end mt-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/blog/${blog?.id}`)}
            >
              Read More
            </button>
          </div>
        </div>

        {blog?.isShowImageRightSide && (
          <figure className="p-5">
            <img src={blog?.image_url} alt="thumbnail" className="rounded-xl" />
          </figure>
        )}
      </div>
    </>
  );
};

export default BlogComponent;
