import React from "react";
import Header from "../Components/Header";
import Lottie from "react-lottie";
import BookLottie from "../Components/Lotties/BookLottie.json";
import { Grid2, Item, Box } from "@mui/material";
import openBook from "../assests/openBook.png";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import "../assests/Home.css";
import "../index.css";
import { Button } from "react-bootstrap";
import CatigoriesCard from "../Components/cards/CatigoriesCard";
import BookCard from "../Components/cards/BookCard";
import { useMediaQuery } from "@mantine/hooks";
const Home = () => {
  const defaultOptions = {
    loop: true, // Enable looping
    autoplay: true, // Automatically start the animation
    animationData: BookLottie, // The animation data (JSON)
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Renderer settings
    },
  };
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  return (
    <div className="all" style={{ marginTop: isSmallScreen ? "100px" : "0px" }}>
      <Grid2
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
      >
        <Grid2 item xs={12} sm={6} md={6} sx={{ marginTop: "-100px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <img
              src={openBook}
              alt="Open Book"
              className="floating-image"
              style={{ width: "100%", maxWidth: "400px", height: "auto" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "space-between",
                marginLeft: "35px",
              }}
            >
              <h2 className="titles">Dusty Book</h2>
              <h6
                style={{
                  fontSize: "15px",
                  marginTop: "5px",
                  fontWeight: "400",
                  fontStyle: "italic",
                }}
              >
                hil distinctio asperiores id animi iste aperiam quaerat officia
                recusandae? Cupiditate porro ex deserunt delectus sit? Quod qui
                rerum hic?
              </h6>
              <Button className="orang"> take a look!</Button>
            </div>
          </Box>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignSelf: "end",
              height: "auto",
              width: "100%",
            }}
          >
            <Lottie options={defaultOptions} height={400} width={400} />
          </Box>
        </Grid2>
      </Grid2>
      {/* ----------divider--------- */}
      <div className="divider">
        <div class="center-diamond"></div>
      </div>
      <CatigoriesCard />
      {/* ----------divider--------- */}
      <div className="divider">
        <div class="center-diamond"></div>
      </div>
      <BookCard />
      {/* ----------divider--------- */}
      <div className="divider">
        <div class="center-diamond"></div>
      </div>
    </div>
  );
};

export default Home;
