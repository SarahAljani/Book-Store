import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfos } from "../../redux/actions/actions";
import CartTable from "../cards/CartTable";
import CartTableSummary from "./CartTableSummary";

const Summary = ({ onValid }) => {
  const user = useSelector((state) => state.users.userInfos);
  const [formValues, setFormValues] = useState(user);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName" || name === "lastName") {
      if (!/^[a-zA-Z]+$/.test(value)) {
        error = `${
          name === "firstName" ? "First" : "Last"
        } name should contain only letters.`;
      }
    }

    if (name === "phoneNumber") {
      if (!/^\d+$/.test(value)) {
        error = "Phone number should contain only digits.";
      }
    }

    if (name === "address") {
      if (!/^[a-zA-Z]+\s+[a-zA-Z]+\s+\d+[\d\s\-]*$/.test(value)) {
        error = "Address should contain city, neighborhood, and street number.";
      }
    }

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
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Control
            disabled
            type="text"
            name="firstName"
            value={formValues.firstName}
            placeholder="Enter Your First Name"
            onChange={handleChange}
            isInvalid={!!formErrors.firstName}
          />
          {formErrors.firstName && (
            <div style={{ color: "red", fontSize: "0.875em" }}>
              {formErrors.firstName}
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Control
            disabled
            type="text"
            name="lastName"
            value={formValues.lastName}
            placeholder="Enter Your Last Name"
            onChange={handleChange}
            isInvalid={!!formErrors.lastName}
          />
          {formErrors.lastName && (
            <div style={{ color: "red", fontSize: "0.875em" }}>
              {formErrors.lastName}
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Control
            disabled
            type="text"
            name="phoneNumber"
            value={formValues.phoneNumber}
            placeholder="Enter Your Phone Number"
            onChange={handleChange}
            isInvalid={!!formErrors.phoneNumber}
          />
          {formErrors.phoneNumber && (
            <div style={{ color: "red", fontSize: "0.875em" }}>
              {formErrors.phoneNumber}
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Control
            disabled
            type="text"
            name="address"
            value={formValues.address}
            placeholder="Enter Your Address"
            onChange={handleChange}
            isInvalid={!!formErrors.address}
          />
          {formErrors.address && (
            <div style={{ color: "red", fontSize: "0.875em" }}>
              {formErrors.address}
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Control
            disabled
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
            disabled
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
      <CartTableSummary/>
    </>
  );
};

export default Summary;
