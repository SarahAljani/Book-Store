import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import HistoryAuthorization from "../Components/History/HistoryAuthurization";
import HistoryTable from "../Components/History/HistoryTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const steps = ["Authorization", "View History"];

const History = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === 0 && isFormValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1) {
      navigate(""); // Navigate to a different route if needed
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormValidation = (isValid) => {
    setIsFormValid(isValid);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you've finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 && (
            <HistoryAuthorization onValid={handleFormValidation} />
          )}
          {activeStep === 1 && currentUser && (
            <HistoryTable user={currentUser} />
          )}
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
            {activeStep === steps.length - 1 ? (
              <></>
            ) : (
              <Button
                onClick={handleNext}
                disabled={activeStep === 0 && !isFormValid}
              >
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default History;
