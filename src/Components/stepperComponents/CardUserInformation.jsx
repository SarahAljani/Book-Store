import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfos } from "../../redux/actions/actions";

const CardUserInformation = ({ onValid }) => {
  const user = useSelector((state) => state.users.userInfos);
  const [formValues, setFormValues] = useState(user);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const validateField = (name, value) => {
    let error = "";

    if (name === "userName") {
      if (/\s/.test(value)) {
        error = "Username should not contain spaces.";
      }
    }

    if (name === "cardNumber") {
      if (!/^\d{3,12}$/.test(value)) {
        error = "Card number must be between 3 and 12 digits.";
      }
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return !error; // Return true if valid
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the specific field
    const isValidField = validateField(name, value);

    // Update form values
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check overall form validity and pass it to the parent
    const isFormValid =
      Object.keys(formErrors).every((key) => formErrors[key] === "") &&
      isValidField;
    onValid(isFormValid, { ...formValues, [name]: value });

    // Dispatch form values if valid
    if (isFormValid) {
      dispatch(addUserInfos({ ...formValues, [name]: value }));
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Control
            type="text"
            name="userName"
            value={formValues.userName}
            placeholder="Enter Your User Name"
            onChange={handleChange}
            isInvalid={!!formErrors.userName}
          />
          {formErrors.userName && (
            <div style={{ color: "red", fontSize: "0.875em" }}>
              {formErrors.userName}
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCardNumber">
          <Form.Control
            type="text"
            name="cardNumber"
            value={formValues.cardNumber}
            placeholder="Enter Your Card Number"
            onChange={handleChange}
            isInvalid={!!formErrors.cardNumber}
          />
          {formErrors.cardNumber && (
            <div style={{ color: "red", fontSize: "0.875em" }}>
              {formErrors.cardNumber}
            </div>
          )}
        </Form.Group>
      </Form>
    </>
  );
};

export default CardUserInformation;
