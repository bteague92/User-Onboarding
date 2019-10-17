import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    status && setData(data => [...data, status]);
  }, [status]);

  return (
    <div>
      <h1>User Onboarding</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p>{errors.name}</p>}

        <Field type="text" name="email" placeholder="email" />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <Field type="password" name="password" placeholder="password" />
        {touched.password && errors.password && <p>{errors.password}</p>}

        <label>
          {" "}
          Terms of Service
          <Field type="checkbox" name="tos" checked={values.tos} />
          <span />
        </label>

        <button type="submit">Submit!</button>
      </Form>

      {data.map(data => (
        <ul key={data.id}>
          <li>Name: {data.name}</li>
          <li>Email: {data.email}</li>
          <li>Password: {data.password}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      tos: tos || false,
      password: password || "",
      name: name || "",
      email: email || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    password: Yup.string().required(),
    email: Yup.string().required()
  }),

  handleSubmit(values, { setStatus }, setUsers) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;
