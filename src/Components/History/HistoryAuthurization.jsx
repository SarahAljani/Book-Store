import React, { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { update_current_user } from "../../redux/actions/actions";

const HistoryAuthorization = ({ onValid }) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    userName: "",
    cardNumber: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Debounce validation function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Validate field value
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "userName":
        if (/\s/.test(value)) {
          error = "Username should not contain spaces.";
        }
        break;
      case "cardNumber":
        if (!/^\d{3,12}$/.test(value)) {
          error = "Card number must be between 3 and 12 digits.";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return !error;
  };

  // Handle form value changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate field on change
    validateField(name, value);

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Debounced form validation
  const validateForm = useCallback(
    debounce(() => {
      const isValid = Object.keys(formErrors).every(
        (key) => formErrors[key] === ""
      );

      const matchingUser = users.find(
        (user) =>
          user.userName === formValues.userName &&
          user.cardNumber === formValues.cardNumber
      );

      if (isValid && matchingUser) {
        setIsFormValid(true);
        onValid(true);
        dispatch(update_current_user(matchingUser));
      } else {
        setIsFormValid(false);
        onValid(false);
      }
    }, 500),
    [formValues, formErrors, users, onValid, dispatch]
  );

  useEffect(() => {
    validateForm();
  }, [formValues, formErrors, validateForm]);

  return (
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
  );
};

export default HistoryAuthorization;
