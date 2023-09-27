import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../helpers";
import CardLayout from "./CardLayout";

const BlogCard = ({
  blog,
  isShowImageLeftSide = false,
  isShowImageRightSide = false,
  isReadMore = false,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <CardLayout>
        {isShowImageLeftSide && (
          <figure className="p-5 w-full sm:w-[500px] h-[300px] m-auto sm:m-0">
            <img
              src={blog?.image_url}
              alt="thumbnail"
              className="rounded-xl w-full h-full"
            />
          </figure>
        )}

        <div className="card-body p-5">
          <h2 className="card-title">{blog?.title}</h2>
          <p>
            {blog.content}{" "}
            {isReadMore && (
              <span>
                {blog.tags?.map(
                  (tag, index) =>
                    `#${tag}${blog.tags?.length - 1 !== index ? ", " : "."}`
                )}
              </span>
            )}
          </p>

          <div className="card-actions justify-end mt-3">
            {isReadMore ? (
              <div>
                <p>
                  Author: <b>{blog.author}</b>
                </p>
                <p>
                  Published: <b>{formatDate(blog.date)}</b>
                </p>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/blog/${blog?.id}`)}
              >
                Read More
              </button>
            )}
          </div>
        </div>

        {isShowImageRightSide && (
          <figure className="p-5 w-full sm:w-[500px] h-[300px] m-auto sm:m-0">
            <img
              src={blog?.image_url}
              alt="thumbnail"
              className="rounded-xl w-full h-full"
            />
          </figure>
        )}
      </CardLayout>
    </>
  );
};

export default BlogCard;
