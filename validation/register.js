const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // converting empty fields to emptry string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // password checks
  if (Validator.isEmpty(data.password)) {
    errors.password - "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password confirmation is required!";
  }

  if (!Validator.isLength(data.password, { min: 7, max: 30 })) {
    errors.password = "Password must be at least 7 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password do not match. Please try again";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
