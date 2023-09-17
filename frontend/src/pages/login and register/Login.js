import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./LoginRegister.css";
import { loginStart, loginSucess, loginFailure } from "../../store/logintask";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const isLogin = searchParams.get("mode") === "login";
  const navigate = useNavigate();

  const handleCallbackResponse = useCallback(
    (response) => {
      var userObject = jwt_decode(response.credential);
      localStorage.setItem("googleUserObj", JSON.stringify(userObject));

      if (userObject) {
        dispatch(
          loginSucess({
            user: userObject.sub,
          })
        );
        navigate("/");
      }
    },
    [dispatch, navigate]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginStart());
      try {
        const res = await axios.post(
          "http://localhost:5000/auth/verify",
          {
            email: email,
            password: password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.data) {
          dispatch(loginSucess({ user: res.data.user.username }));
          console.log(res.data.user);
          navigate("/");
        }
      } catch (err) {
        dispatch(loginFailure());
        toast.error(err.response.data.message || "Unexpected Error Occured");
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/auth/register",
          JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const resdata = await res.data;
        if (resdata) {
          navigate("/auth?mode=login");
        }
      } catch (err) {
        dispatch(loginFailure());
        toast.error(err.response.data.message || "Unexpected Error Occured");
      }
    }
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "129674529792-1p2m6e1ugiq98m38216gdl9imu9srplc.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googleDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, [handleCallbackResponse]);

  return (
    <section className="login">
      <ToastContainer position="top-center" />
      <div className="form-container">
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <form onSubmit={handleSubmit}>
          <div className={isLogin ? "input-field show" : "input-field"}>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
              required={!isLogin}
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="input-field">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
            />
            <span></span>
            <label>Email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
            />
            <span></span>
            <label>Password</label>
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
          {isLogin && <div className="orStyle">OR</div>}
          {isLogin && (
            <div className="googleDivContainer">
              <div id="googleDiv"></div>
            </div>
          )}
          <div className="signup-link">
            {isLogin ? "Not a member?" : "Already have an account?"}
            <Link to={`/auth?mode=${isLogin ? "signup" : "login"}`}>
              {isLogin ? " Sign Up" : " Login"}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
