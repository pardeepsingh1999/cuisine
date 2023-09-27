import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import BlogsMockData from "../mockData/blogs.json";
import HeadingComponent from "../components/HeadingComponent";
import CardLayout from "../components/CardLayout";
import BlogCard from "../components/BlogCard";

const BlogDetails = () => {
  const params = useParams();

  const blog = useMemo(() => {
    return BlogsMockData?.find((each) => each.id === params.id);
  }, [params?.id]);

  return (
    <>
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
