import React, { Fragment } from "react";
import AboutCard from "../components/AboutCard";
import { APP_LOGO } from "../config";
import AboutMockData from "../mockData/about.json";

const AboutUs = () => {
  const GettoKnowUs = {
    title: "Get to Know Us",
    content:
      "Welcome to our platform dedicated to celebrating the culinary excellence of some of India's most esteemed chefs. We are passionate about showcasing the talent, creativity, and influence that these culinary maestros have had on the global food scene.",
    image_url: APP_LOGO,
    isShowImageLeftSide: true,
  };

  const OurMission = {
    title: "Our Mission",
    content:
      "We aim to provide a platform where food enthusiasts, both novice and experienced, can explore the brilliance of Indian cuisine through the lens of these exceptional chefs. Through articles, recipes, and insights, we strive to foster an appreciation for the diverse and rich tapestry of flavors that Indian cooking has to offer.",
    image_url: APP_LOGO,
    isShowImageRightSide: true,
  };

  const GetInspired = {
    title: "Get Inspired",
    content: `Join us on a culinary journey that celebrates innovation, tradition, and the boundless creativity of these esteemed Indian chefs. Whether you're an aspiring chef, a home cook, or simply someone who loves good food, you'll find inspiration and insight within these pages.

      Thank you for being a part of our culinary community!`,
    image_url: APP_LOGO,
    isShowImageLeftSide: true,
  };

  return (
    <>
      <div className="max-w-sm md:max-w-3xl bg-base-100 mx-auto mb-2">
        <h2 className="text-2xl font-extrabold">About Us</h2>
      </div>

      <AboutCard data={GettoKnowUs} />

      <div className="max-w-sm md:max-w-3xl bg-base-100 mx-auto mb-2">
        <div className="divider" />

        <h2 className="text-2xl font-extrabold">Meet the Culinary Titans</h2>
      </div>

      {AboutMockData.map((each, index) => (
        <Fragment key={each.id}>
          <AboutCard
            data={{
              ...each,
              isShowImageLeftSide: index % 2 === 0,
              isShowImageRightSide: index % 2 !== 0,
            }}
          />
        </Fragment>
      ))}

      <div className="max-w-sm md:max-w-3xl bg-base-100 mx-auto mb-2">
        <div className="divider" />

        <h2 className="text-2xl font-extrabold">Why We Exist</h2>
      </div>

      <AboutCard data={OurMission} />

      <div className="max-w-sm md:max-w-3xl bg-base-100 mx-auto mb-2">
        <div className="divider" />

        <h2 className="text-2xl font-extrabold">Discover Your Creative Side</h2>
      </div>

      <AboutCard data={GetInspired} />
    </>
  );
};

export default AboutUs;
