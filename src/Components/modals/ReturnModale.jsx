import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import DatePickerValue from "../DatePickerValue";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import { updateUserCartReturnDate } from "../../redux/actions/actions";
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
  display: "flex",
  flexDirection: "column",
  rowGap: "7px",
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

export default function ReturnModal({
  open,
  handleClose,
  handleContinue,
  calculatedReturnDay,
  setCalculatedReturnDay,
  books,
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    console.log("date", date); // Log the date passed to the handler
    setSelectedDate(date); // Update the local state

    if (date) {
      dispatch(updateUserCartReturnDate(date)); // Use the date directly
      console.log("returned");
    } else {
      setCalculatedReturnDay(null);
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <DatePickerValue setDate={handleDateChange} />
            {calculatedReturnDay && (
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mt: 2, fontFamily: "noto sans", fontSize: "14px" }}
              >
                Your return date is:{" "}
                <span style={{ color: "#bb2701" }}>{calculatedReturnDay}</span>
              </Typography>
            )}
            <div className="agree" style={{ display: "flex" }}>
              <FormControlLabel
                style={{ marginLeft: "1px", marginRight: "5px" }}
                control={
                  <Checkbox
                    checked={isCheckboxChecked}
                    onChange={(event) =>
                      setIsCheckboxChecked(event.target.checked)
                    }
                  />
                }
                label=""
              />
              <span style={{ fontSize: "13px", marginLeft: "5px" }}>
                I agree to the Book Dusty's Terms
              </span>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!selectedDate || !isCheckboxChecked}
              sx={{
                backgroundColor:
                  !selectedDate || !isCheckboxChecked ? "#d3d3d3" : "#bb2701",
                width: "100px",
                color:
                  !selectedDate || !isCheckboxChecked ? "#c0c0c0" : "#ffffff",
              }}
            >
              Continue
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
