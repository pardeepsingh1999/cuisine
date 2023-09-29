import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import BlogsMockData from "../mockData/blogs.json";
import HeadingComponent from "../components/HeadingComponent";
import CardLayout from "../components/CardLayout";
import BlogCard from "../components/BlogCard";
import ScrollUp from "../components/ScrollUp";

const BlogDetails = () => {
  const params = useParams();

  const blog = useMemo(() => {
    return BlogsMockData?.find((each) => each.id === params.id);
  }, [params?.id]);

  return (
    <>
      {/* "ScrollUp" component to ensure that when the page loads or reloads, it starts at the top rather than in the middle */}
      <ScrollUp />

      <HeadingComponent title="Blog Details" isShowBackBtn />

      {blog ? (
        <>
          <BlogCard blog={blog} isShowImageLeftSide isReadMore />
        </>
      ) : (
        <CardLayout>
          <div className="card-body text-error text-center">
            Blog not found!
          </div>
        </CardLayout>
      )}
    </>
  );
};

export default BlogDetails;
