import React, { Fragment } from "react";
import CardLayout from "../components/CardLayout";
import Carousel from "../components/Carousel";
import HomeBannerData from "../mockData/homeBanner.json";
import RecipesMockData from "../mockData/recipes.json";
import cookingTipsData from "../mockData/cookingTips.json";
import ChefMockData from "../mockData/chef.json";
import HeadingComponent from "../components/HeadingComponent";
import ChefCard from "../components/ChefCard";
import AboutCard from "../components/AboutCard";
import RecipesCard from "../components/RecipesCard";

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

      <HeadingComponent title="Featured Recipes" isShowDivider />
      {RecipesMockData.map((each, index) => (
        <Fragment key={each.id}>
          <RecipesCard data={each} chef={ChefMockData[0]} isShowImageLeftSide />
        </Fragment>
      ))}

      <HeadingComponent title="Cooking Tips" isShowDivider />
      {cookingTipsData.map((each, index) => (
        <Fragment key={each.id}>
          <AboutCard
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
