import React, { Fragment } from "react";
import BlogCard from "../components/BlogCard";
import HeadingComponent from "../components/HeadingComponent";
import BlogsMockData from "../mockData/blogs.json";

const Blogs = () => {
  return (
    <>
      <HeadingComponent title="Blogs" />

      {BlogsMockData?.map((blog, index) => (
        <Fragment key={blog.id}>
          <BlogCard
            blog={blog}
            isShowImageLeftSide={index % 2 === 0}
            isShowImageRightSide={index % 2 !== 0}
          />
        </Fragment>
      ))}
    </>
  );
};

export default Blogs;
