import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartTable from "../Components/cards/CartTable";
import Lottie from "react-lottie";
import EmptyLottie from "../Components/Lotties/EmptyLottie.json";
import confirm from "../Components/Lotties/confirm.json";
import { Button } from "@mui/joy";

const Cart = () => {
  const books = useSelector((state) => state.cart.books);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();
  // Lottie animation settings
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EmptyLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptionsConfirm = {
    loop: true,
    autoplay: true,
    animationData: confirm,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleApproveOrder = () => {
    setOrderPlaced(true); // Show the order confirmation screen
    dispatch({ type: "RESET_CART" });
    // After 5 seconds, revert back to the cart page
    setTimeout(() => {
      setOrderPlaced(false);
    }, 5000);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      {/* Show Order Confirmation Screen */}
      {orderPlaced ? (
        <div style={{ textAlign: "center" }}>
          <Lottie options={defaultOptionsConfirm} height={300} width={300} />
          <h2>Your order has been placed successfully!</h2>
        </div>
      ) : books && books.length > 0 ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CartTable />
          <hr
            style={{ height: "1px", backgroundColor: "black", width: "100%" }}
          />
          <Button
            color="primary"
            style={{ alignSelf: "end" }}
            onClick={handleApproveOrder}
          >
            Approve Order
          </Button>
        </div>
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
