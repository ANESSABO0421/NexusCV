import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { authStyles as styles } from "../assets/dummystyle";
import axiosInstance from "../utils/axiosInstance";
import { validateEmail } from "../utils/helper";
import { API_PATH } from "../utils/apiPaths";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter valid email!!!");
      return;
    }
    if (!validateEmail(email)) {
      setError("please enter valid email");
      return;
    }
    if (!password) {
      setError("please enter password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong.Pleas try again later"
      );
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>
          Signin to continue building amazing resume
        </p>
      </div>
      {/* form */}
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="NexusCV@gmail.com"
          type="email"
        />
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="password"
          placeholder="Enter password"
          type="password"
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.submitButton}>
          Sign in
        </button>
        <p className={styles.switchText}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("signup")}
            className={styles.switchButton}
          >
            Sign up
          </button>
        </p>{" "}
      </form>
    </div>
  );
};

export default Login;
