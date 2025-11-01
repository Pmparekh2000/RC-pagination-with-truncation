import React, { useState } from "react";

const ShimmerBox = () => {
  return <div className="shimmer-box"></div>;
};

const Shimmer = () => {
  const [shimmerCount, setShimmerCount] = useState(
    Array.from({ length: 5 }, (_) => {
      return null;
    })
  );

  return (
    <div className="shimmer-container">
      {shimmerCount?.map((_, index) => {
        return <ShimmerBox key={index} />;
      })}
    </div>
  );
};

export default Shimmer;
