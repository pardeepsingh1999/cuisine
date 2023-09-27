import React, { Fragment } from "react";
import CardLayout from "../components/CardLayout";
import Carousel from "../components/Carousel";
import HomeBannerData from "../mockData/homeBanner.json";
import ChefMockData from "../mockData/chef.json";
import HeadingComponent from "../components/HeadingComponent";
import ChefCard from "../components/ChefCard";

const Home = () => {
  return (
    <>
      <CardLayout>
        <Carousel data={HomeBannerData} />
      </CardLayout>

      <HeadingComponent title="Meet the Culinary Titans" isShowDivider />
      {ChefMockData.map((each, index) => (
        <Fragment key={each.id}>
          <ChefCard
            data={each}
            isShowImageLeftSide={index % 2 === 0}
            isShowImageRightSide={index % 2 !== 0}
          />
        </Fragment>
      ))}
    </>
  );
};

export default Home;
