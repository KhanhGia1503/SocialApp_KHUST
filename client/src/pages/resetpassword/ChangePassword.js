import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import style from "../login/Login.module.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ChangePasswordHandler() {
  const navigate = useNavigate();

  const returnLoginHandler = () => {
    navigate("/login");
  };
  const { token } = useParams();
  const [sendPasswordSuccess, setSendPasswordSuccess] = useState();
  const { Formik } = formik;

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "At least 6 characters!"),
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
      {!sendPasswordSuccess && (
        <Formik
          validationSchema={schema}
          onSubmit={(values) => console.log({ ...values, token })}
          initialValues={{
            password: "",
            confirmPassword: "",
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
              onSubmit={async ({ token, password }) => {
                try {
                  const res = await fetch(
                    "http://localhost:8800/server/auth/changepassword",
                    {
                      method: "POST",
                      // credentials: "include",
                      headers: { "Content-type": "application/json" },
                      body: JSON.stringify({
                        token,
                        password,
                      }),
                    }
                  );
                  const data = await res.json();
                  console.log(data);
                  if (data.error) {
                    throw new Error(data.error);
                  }
                  toast.success("changed password successfully");
                } catch (error) {
                  console.log(error);
                  toast.error(error.message);
                }
              }}
              className={`${style.form} p-3 ${style.resetPasswordForm} `}
            >
              <div className={`px-5 py-3`}>
                <h5> Change password</h5>
              </div>
              <Row className="mb-3 mx-0 w-100 p-0">
                <Form.Group
                  as={Col}
                  onSubmit={handleSubmit}
                  controlId="validationFormik101"
                  className="position-relative p-0"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
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
                    type="confirmPassword"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      errors.confirmPassword && touched.confirmPassword
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <p className="fs-6">Make sure it's at least 6 characters</p>

              <Button className={` ${style.btnsubmit} w-100  `} type="submit">
                Change password
              </Button>
            </Form>
          )}
        </Formik>
      )}
      {sendPasswordSuccess && (
        <div className={` ${style.returnLoginBox}  gap-2 ${style.form}  p-3 `}>
          <div className={` px-4 py-3 ${style.mAuto}`}>
            <h5 className="d-flex align-items-center justify-content-center">
              {" "}
              Success
            </h5>
          </div>

          <div
            className={` w-100 ${style.btnReturnLogin}`}
            onClick={returnLoginHandler}
          >
            <Link to={"/login"} className="bold p-1">
              Return to Log in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePasswordHandler;
