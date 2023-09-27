import React, { memo, useEffect, useRef } from "react";

const ScrollUp = () => {
  const ref = useRef();

  useEffect(() => {
    try {
      ref?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    } catch (error) {
      console.log({ error });
    }
  }, []);

  return <div ref={ref} />;
};

export default memo(ScrollUp);
