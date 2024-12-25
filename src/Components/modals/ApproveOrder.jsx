import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import DatePickerValue from "../DatePickerValue";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { addUser } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
  height: "auto",
};

export default function ApproveOrder({ open, handleClose, user }) {
  const navigate = useNavigate(`hola`);
  const dispatch = useDispatch();
  //   const [isApproved, setIsApproved] = useState(false); // State to track checkbox
  const handleYes = () => {
    dispatch(addUser(user));
    navigate(`hola`);
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: "flex", gap: 3 }}>
              <h2 style={{ fontSize: "20px", marginLeft: "5px" }}>
                Are You Sure?
              </h2>
            </Box>
            <Button
              onClick={handleYes}
              sx={{ color: "#fff", backgroundColor: "#017cb6" }}
            >
              YES!
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                color: "#fff",
                backgroundColor: "#a3a3a3",
                marginLeft: "10px",
              }}
            >
              NO
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
