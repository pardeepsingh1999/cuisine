import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import BlogsMockData from "../mockData/blog.json";

const BlogDetails = () => {
  const navigate = useNavigate();

  const params = useParams();

  const blog = useMemo(() => {
    return BlogsMockData?.find((each) => each.id === params.id);
  }, [params?.id]);

  return (
    <>
      <div className="flex items-center max-w-sm md:max-w-3xl bg-base-100 mx-auto mb-5">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
        </button>
        <h2 className="text-3xl font-extrabold">Blog Details</h2>
      </div>

      <div className="card max-w-sm md:max-w-3xl md:card-side bg-base-100 shadow-xl mx-auto mb-5">
        {blog ? (
          <>
            <figure className="p-5">
              <img
                src={blog.image_url}
                alt="thumbnail"
                className="rounded-xl"
              />
            </figure>

            <div className="card-body pt-0 md:p-5">
              <h2 className="card-title">{blog.title}</h2>
              <p className="">
                {blog.content}{" "}
                <span>
                  {blog.tags?.map(
                    (tag, index) =>
                      `#${tag}${blog.tags?.length - 1 !== index ? ", " : "."}`
                  )}
                </span>
              </p>

              <div className="card-actions justify-end mt-3">
                <div>
                  <p>
                    Author: <b>{blog.author}</b>
                  </p>
                  <p>
                    Published: <b>{blog.date}</b>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="card-body text-error text-center">
            Blog not found!
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
