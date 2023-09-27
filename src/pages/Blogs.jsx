import React, { Fragment } from "react";
import BlogComponent from "../components/BlogComponent";
import BlogsMockData from "../mockData/blogs.json";

const Blogs = () => {
  return (
    <>
      <div className="max-w-sm md:max-w-3xl bg-base-100 mx-auto mb-2">
        <h2 className="text-2xl font-extrabold">Blogs</h2>
      </div>

      {BlogsMockData?.map((blog, index) => (
        <Fragment key={blog.id}>
          <BlogComponent
            blog={{
              ...blog,
              isShowImageLeftSide: index % 2 === 0,
              isShowImageRightSide: index % 2 !== 0,
            }}
          />
        </Fragment>
      ))}
    </>
  );
};

export default Blogs;
