import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLogin from "../../hooks/useLogin";
function Login() {
  const { loading, login } = useLogin();
  const { Formik } = formik;
  const navigate = useNavigate();
  const loginHandler = async ({ email, password }) => {

    await login({ email, password });

  };
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "At least 6 characters!"),
  });
  return (
    <div
      className={` d-flex justify-content-center  align-items-start mt-5 ${style.container}`}
    >
      <Formik
        validationSchema={schema}
        onSubmit={loginHandler}
        initialValues={{
          email: "",
          password: "",
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
              <h5> Log in to HustBook</h5>
            </div>
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
                controlId="validationFormik103"
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
            <Button className={` ${style.btnsubmit} w-100  `} type="submit">
              Log in
            </Button>

            <div className={` ${style.texts} mt-1 d-flex gap-1 `}>
              <span>
                <Link to="/password-reset">Forgotten password?</Link>
              </span>
              <span>
                Don't have an account?
                <Link to="/password-reset">Sign up</Link>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
