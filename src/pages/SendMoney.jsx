import { useNavigate, useSearchParams } from 'react-router-dom'; // Import necessary hooks from React Router
import axios from "axios"; // Import axios for making HTTP requests
import { useState } from 'react'; // Import useState for managing local component state

export const SendMoney = () => {
    const [searchParams] = useSearchParams(); // Retrieve search parameters from the URL
    const id = searchParams.get("id"); // Get the recipient's ID from the URL parameters
    const name = searchParams.get("name"); // Get the recipient's name from the URL parameters
    const [amount, setAmount] = useState(0); // State to hold the transfer amount
    const navigate = useNavigate(); // Hook to programmatically navigate to other routes

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div
                    className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
                >
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2> {/* Header for the send money form */}
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span> {/* Display the first letter of the recipient's name */}
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3> {/* Display the recipient's name */}
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs) {/* Label for the amount input */}
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value); // Update the amount state when input changes
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount" // Placeholder for the input field
                                />
                            </div>
                            <button onClick={async () => {
                                await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                    to: id, // Recipient's ID
                                    amount // Amount to transfer
                                }, {
                                    headers: {
                                        //the from ID will be decoded at backend through jwt
                                        Authorization: "Bearer " + localStorage.getItem("token") // Authorization header with the token
                                    }
                                }).then(() => {
                                    navigate("/dashboard"); // Navigate to the dashboard on successful transfer
                                }).catch((error) => {
                                    console.error("Transfer failed:", error); // Log error if transfer fails
                                    // Handle error, show notification, etc.
                                });
                            }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                Initiate Transfer {/* Button to initiate the transfer */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
