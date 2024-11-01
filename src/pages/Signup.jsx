import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState(""); // State for first name
    const [lastName, setLastName] = useState(""); // State for last name
    const [username, setUsername] = useState(""); // State for username/email
    const [password, setPassword] = useState(""); // State for password
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} /> 
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox onChange={e => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
                    <InputBox onChange={e => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
                    <InputBox onChange={e => setUsername(e.target.value)} placeholder="suyashekhande@gmail.com" label={"Email"} />
                    <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                        <Button onClick={async () => {
                            // Handle signup request
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                firstName,
                                lastName,
                                password
                            }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            localStorage.setItem("token", response.data.token); // Store token in localStorage
                            navigate("/dashboard"); // Navigate to dashboard on success
                        }} label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} /> 
                </div>
            </div>
        </div>
    );
}
