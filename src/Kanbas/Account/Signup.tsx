import React from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <div className="d-flex flex-column">
        <input placeholder="username" className="form-control mb-1"/>
        <input placeholder="password" type="password" className="form-control mb-1"/>
        <input placeholder="verify password" type="password" className="form-control"/>
        <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100 mt-3"> Sign up </Link>
        <Link to="/Kanbas/Account/Signin" className="btn btn-secondary w-100 mt-3">Sign in</Link>
      </div>
    </div>
);}