import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    // State to hold the list of users and the filter input
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    // Function to get the current user's ID from the JWT
    const getCurrentUserId = () => {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        if (!token) return null; // Return null if no token is found

        const payload = token.split('.')[1]; // Split the JWT to get the payload
        if (!payload) return null; // Return null if payload is not found

        // Decode the base64url encoded payload to extract user ID
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decodedPayload.userId; // Return the user ID from the payload
    };

    const currentUserId = getCurrentUserId(); // Get the current user's ID

    // Effect to fetch users when the component mounts or currentUserId changes
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk")
            .then(response => {
                // Filter out the current user from the response data
                const filteredUsers = response.data.user.filter(user => user._id !== currentUserId);
                setUsers(filteredUsers); // Update the users state with filtered users
            })
            .catch(err => {
                console.error("Failed to fetch users", err); // Log error if fetching fails
            });
    }, [currentUserId]); // Dependency array to run effect when currentUserId changes

    // Function to filter users based on the search input
    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase(); // Convert full name to lowercase
        return fullName.includes(filter.toLowerCase()); // Compare with the lowercase filter
    });

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)} // Update filter state on input change
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {filteredUsers.map(user => <User key={user._id} user={user} />)} {/* Render filtered users */}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate = useNavigate(); // Hook to programmatically navigate

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]} {/* Display the first letter of the user's first name */}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName} {/* Display user's full name */}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button onClick={() => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstName); // Navigate to the send money page with user ID and name
                }} label={"Send Money"} />
            </div>
        </div>
    );
}
