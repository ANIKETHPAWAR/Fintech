import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const initial = name ? name[0].toUpperCase() : "?";

  const send = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          
          amount,
          to: id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Transfer Successful");
    } catch (e) {
      alert("Transfer Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white border-opacity-20 shadow-2xl">
        <div className="text-white text-xl font-semibold mb-6 flex items-center space-x-3">
          <ArrowLeft className="w-5 h-5" />
          <span>Send Money</span>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-2xl text-white font-semibold">{initial}</span>
          </div>
          <h3 className="text-2xl font-semibold text-black">{name}</h3>
        </div>

        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-black mb-2">
            Amount (in ₹)
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-black border-opacity-20 rounded-lg text-black placeholder-black placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={send}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-200 transform hover:scale-105 shadow-lg"
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};
