import React, { useState } from 'react';

const AuthPage = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const onInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Reduce link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title" style={{ marginBottom: 40 }}>
              Authorization
            </span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter first name"
                  id="firstname"
                  type="text"
                  name="firstname"
                  onChange={onInputChange}
                />
                <label htmlFor="firstname">First Name</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter last name"
                  id="lastname"
                  type="text"
                  name="lastname"
                  onChange={onInputChange}
                />
                <label htmlFor="lastname">Last Name</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="email"
                  name="email"
                  onChange={onInputChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  onChange={onInputChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }}>
              Login
            </button>
            <button className="btn grey lighten-1 black-text">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
