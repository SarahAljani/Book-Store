import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DECREMENT, INCREMENT } from "../redux/actions/types";
const Counter = () => {
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const countState = useSelector((state) => state.count);
  //  const {countState}=useSelector(state=>state);
  const dispatch = useDispatch();
  const handleDecrement = () => {
    // if (count >= 2) setCount(count - 1);
    dispatch({ type: DECREMENT });
    console.log(countState);
  };
  const handleIncrement = () => {
    // if (count < limit) setCount(count + 1);

    dispatch({ type: INCREMENT });
    console.log(countState);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>{countState}</p>
      <Button onClick={handleIncrement}>Increment</Button>
      <Button className="mt-1" onClick={handleDecrement}>
        Deccrement
      </Button>
    </div>
  );
};

export default Counter;
