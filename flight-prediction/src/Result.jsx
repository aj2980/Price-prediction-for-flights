import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const prediction = location.state?.prediction;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-transparent">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-8 w-full max-w-md text-center border border-white/30">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Prediction Result</h1>
        <p className="text-lg text-gray-700">Your Estimated Flight Price:</p>
        <h2 className="text-4xl font-bold text-green-800 mt-2">₹{prediction}</h2>

        <button onClick={() => navigate("/")} className="mt-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:opacity-90 transition">
          🔙 Back to Prediction
        </button>
      </div>
    </div>
  );
}

export default Result;
