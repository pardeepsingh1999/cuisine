import React, { Fragment } from "react";
import AboutCard from "../components/AboutCard";
import HeadingComponent from "../components/HeadingComponent";
import OurOfficesMapComponent from "../components/OurOfficesMapComponent";
import { APP_LOGO } from "../config";
import AboutMockData from "../mockData/about.json";

const AboutUs = () => {
  const GettoKnowUs = {
    title: "Get to Know Us",
    content:
      "Welcome to our platform dedicated to celebrating the culinary excellence of some of India's most esteemed chefs. We are passionate about showcasing the talent, creativity, and influence that these culinary maestros have had on the global food scene.",
    image_url: APP_LOGO,
  };

  const OurMission = {
    title: "Our Mission",
    content:
      "We aim to provide a platform where food enthusiasts, both novice and experienced, can explore the brilliance of Indian cuisine through the lens of these exceptional chefs. Through articles, recipes, and insights, we strive to foster an appreciation for the diverse and rich tapestry of flavors that Indian cooking has to offer.",
    image_url: APP_LOGO,
  };

  const GetInspired = {
    title: "Get Inspired",
    content: `Join us on a culinary journey that celebrates innovation, tradition, and the boundless creativity of these esteemed Indian chefs. Whether you're an aspiring chef, a home cook, or simply someone who loves good food, you'll find inspiration and insight within these pages.

      Thank you for being a part of our culinary community!`,
    image_url: APP_LOGO,
  };

  return (
    <>
      <HeadingComponent title="About Us" />
      <AboutCard data={GettoKnowUs} isShowImageLeftSide />

      <HeadingComponent title="Our Offices" isShowDivider />
      <OurOfficesMapComponent />

      <HeadingComponent title="Meet the Culinary Titans" isShowDivider />
      {AboutMockData.map((each, index) => (
        <Fragment key={each.id}>
          <AboutCard
            data={each}
            isShowImageLeftSide={index % 2 === 0}
            isShowImageRightSide={index % 2 !== 0}
          />
        </Fragment>
      ))}

      <HeadingComponent title="Why We Exist" isShowDivider />
      <AboutCard data={OurMission} isShowImageRightSide />

      <HeadingComponent title="Discover Your Creative Side" isShowDivider />
      <AboutCard data={GetInspired} isShowImageLeftSide />
    </>
  );
};

export default AboutUs;
