import FloatingLabel from 'react-bootstrap/FloatingLabel';

import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import style from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSignup from "../../hooks/useSignup";
function Register() {
    const {signup} = useSignup();
  const { Formik } = formik;
  const navigate = useNavigate();
  const signUpHandler = async (input) => {
    console.log(input)
    signup(input);


    //await login({ email, password });

  };
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "At least 6 characters!"),
    username: yup.string().required("User name is required"),
    name: yup.string().required("Full name is required"),
    dob:yup.string().required("Birthday  is required"),
    confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .min(6, "At least 6 characters!")
    .oneOf([yup.ref("password"), null], "Password must match"),
  });
  return (
    <div
      className={` d-flex justify-content-center  align-items-start mt-5 ${style.container}`}
    >
      <Formik
        validationSchema={schema}
         onSubmit={signUpHandler}
        initialValues={{
            username:"",
            name:"",
          email: "",
          password: "",
          gender:"",
          dob:"",

          confirmPassword:""

        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          handleBlur,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={`${style.form} p-3`}
          >
            <div className={`px-5 py-3`}>
              <h5> Sign up to HustBook</h5>
            </div>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                controlId="validationFormik100"
                className="position-relative"
              >
                <Form.Control
                  type="text"
                  placeholder="User name"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.username && touched.username}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                controlId="validationFormik197"
                className="position-relative"
              >
                     <FloatingLabel
        controlId="validationFormik197"
        label="Birthday"
        className="mb-3"
      >
                <Form.Control
                  type="date"
                  placeholder="Select birthday"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.dob && touched.dob}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.dob}
                </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                controlId="validationFormik99"
                className="position-relative"
              >
                <Form.Control
                  type="text"
                  placeholder="Full name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.name && touched.name}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                controlId="validationFormik101"
                className="position-relative"
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.email && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                controlId="validationFormik98"
                className="position-relative"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.password && touched.password}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3  mx-0 w-100 p-0">
              <Form.Group
                as={Col}
                controlId="validationFormik103"
                className="position-relative px-0"
              >

                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.confirmPassword && touched.confirmPassword}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>

              </Form.Group>

            </Row>

            <Button className={` ${style.btnsubmit} w-100   `} type="submit">
              Sign up
            </Button>

            <div className={` ${style.texts} mt-1 d-flex gap-1 `}>
              <span>
                <Link to="/password-reset">Forgotten password?</Link>
              </span>
              <span>
             Have an account?
                <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
