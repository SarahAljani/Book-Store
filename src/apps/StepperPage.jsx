import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PersonalInformation from "../Components/stepperComponents/PersonalInformation";
import CardUserInformation from "../Components/stepperComponents/CardUserInformation";
import Summary from "../Components/stepperComponents/Summary";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfos } from "../redux/actions/actions";
import ApproveOrder from "../Components/modals/ApproveOrder"
import { useResize } from "react-spring";
const steps = ["Personal Information", "Card User Information", "Summary"];

export default function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.userInfos) || {};
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const handleClose = () => {
    setOpen(false);
}
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setOpen(true);
    } else {
      setOpen(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFormValidation = (isValid, values) => {
    setIsFormValid(isValid);
    dispatch(addUserInfos(values)); // Update user infos in Redux
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 && (
            <PersonalInformation onValid={handleFormValidation} />
          )}
          {activeStep === 1 && (
            <CardUserInformation onValid={handleFormValidation} />
          )}
          {activeStep === 2 && <Summary onValid={handleFormValidation} />}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} disabled={!isFormValid}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
      <ApproveOrder open={open} handleClose={handleClose} user={user}/>
    </Box>
    
  );
}
