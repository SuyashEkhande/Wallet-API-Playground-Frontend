import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
  const [balance, setBalance] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the JWT from local storage
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
          },
        });
        setBalance(response.data.balance); // Assuming the API response has a balance field
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred"); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchBalance();
  }, []); // Empty dependency array to run only on component mount

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  const formattedBalance = balance !== null ? balance.toFixed(2) : '0.00';

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">₹ {formattedBalance}</div>
    </div>
  );
};