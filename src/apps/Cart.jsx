import React from "react";
import { useSelector } from "react-redux";
import CartTable from "../Components/cards/CartTable";
import Lottie from "react-lottie";
import EmptyLottie from "../Components/Lotties/EmptyLottie.json";

const Cart = () => {
  // Fetch cart items from Redux
  const books = useSelector((state) => state.cart.books);

  // Lottie animation settings
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EmptyLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Changed this to ensure proper centering
        margin: "0 auto",
      }}
    >
      {books && books.length > 0 ? (
        <CartTable />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Lottie options={defaultOptions} height={300} width={300} />
          <h2>Your cart is empty!</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
