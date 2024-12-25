import { createBrowserRouter, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Home from "../apps/Home";
import Library from "../apps/Library";
import History from "../apps/History";
import Cart from "../apps/Cart";
import CategoriesPage from "../apps/CategoriesPage";
import ContactUs from "../apps/ContactUs";
import BookPage from "../apps/BookPage";
import StepperPage from "../apps/StepperPage";
import HolaPage from "../apps/HolaPage";
const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "library", element: <Library /> },
      { path: "history", element: <History /> },
      { path: "cart", element: <Cart /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "book/:id", element: <BookPage /> },
      { path: "book/category/:index", element: <BookPage /> },
      // Only keep the dynamic category route
      { path: "category/:categoryTitle", element: <CategoriesPage /> },
      { path: "cart/stepper", element: <StepperPage /> },
      { path: "cart/stepper/hola", element: <HolaPage /> },
    ],
  },
]);

export default Router;
