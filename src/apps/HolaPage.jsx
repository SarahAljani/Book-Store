import React from "react";
import Lottie from "react-lottie";
import DoneLottie from "../Components/Lotties/DoneLottie.json"; // Adjust the path as needed
import { useMediaQuery } from "@mantine/hooks";

const HolaPage = () => {
  // Lottie animation settings
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: DoneLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
};

export default HolaPage;
