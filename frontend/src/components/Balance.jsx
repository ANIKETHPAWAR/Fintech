import { useState, useEffect } from "react";
import axios from "axios";

export const BalanceCard = () => {
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBalance(res.data.balance);
    } catch (err) {
      console.error("Failed to fetch balance:", err);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">₹ {balance.toFixed(2)}</div>
    </div>
  );
};
