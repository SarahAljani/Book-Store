import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useMediaQuery } from "@mantine/hooks";
function App() {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: isSmallScreen ? "10px" : "50px",
        marginLeft: isSmallScreen ? "10px" : "50px",
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
