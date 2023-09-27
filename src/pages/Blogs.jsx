import React, { Fragment } from "react";
import BlogComponent from "../components/BlogComponent";
import BlogsMockData from "../mockData/blog.json";

const Blogs = () => {
  return (
    <>
      <div className="max-w-sm md:max-w-3xl bg-base-100 mx-auto mb-5">
        <h2 className="text-3xl font-extrabold">Blogs</h2>
      </div>

      {BlogsMockData?.map((blog) => (
        <Fragment key={blog.id}>
          <BlogComponent blog={blog} />
        </Fragment>
      ))}
    </>
  );
};

export default Blogs;
