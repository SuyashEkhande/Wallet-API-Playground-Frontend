import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: email, // Change this if your API expects a different field name
        password: password,
      });
      // Store the token received from the server
      localStorage.setItem("token", response.data.token);
      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during sign in."); // Handle errors
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
          <InputBox
            placeholder="suyashekhande@gmail.com"
            label={"Email"}
            value={email} // Bind state to input
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            type="password" // Set input type to password
            value={password} // Bind state to input
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
          />
          <div className="pt-4">
            <Button onClick={handleSubmit} label={"Sign in"} /> {/* Call handleSubmit on button click */}
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
