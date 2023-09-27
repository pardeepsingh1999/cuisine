import React, { Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";
import CardLayout from "../components/CardLayout";
import ChefCard from "../components/ChefCard";
import HeadingComponent from "../components/HeadingComponent";
import RecipesCard from "../components/RecipesCard";
import ScrollUp from "../components/ScrollUp";
import ChefMockData from "../mockData/chef.json";
import RecipesMockData from "../mockData/recipes.json";

const Recipes = () => {
  const params = useParams();

  const data = useMemo(() => {
    return ChefMockData?.find((each) => each.id === params.id);
  }, [params?.id]);

  return (
    <>
      {/* "ScrollUp" component to ensure that when the page loads or reloads, it starts at the top rather than in the middle */}
      <ScrollUp />

      <HeadingComponent title={`${data?.title || "Recipes"}`} isShowBackBtn />
      {data ? (
        <>
          <ChefCard data={data} isShowImageLeftSide isViewRecipes />

          <HeadingComponent title="Recipes" isShowDivider />
          {RecipesMockData.map((each, index) => (
            <Fragment key={each.id}>
              <RecipesCard data={each} isShowImageLeftSide={true} />
            </Fragment>
          ))}
        </>
      ) : (
        <CardLayout>
          <div className="card-body text-error text-center">
            Chef's Recipes not found!
          </div>
        </CardLayout>
      )}
    </>
  );
};

export default Recipes;
