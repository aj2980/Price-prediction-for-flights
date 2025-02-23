import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./assets/Style.css";
import "./index.css";
import "./App.css";
function FlightPricePredictor() {
  const [formData, setFormData] = useState({
    airline: "",
    source_city: "",
    departure_time: "",
    stops: "",
    arrival_time: "",
    destination_city: "",
    class: "",
    departure_date: "",
  });

  const navigate = useNavigate(); // Hook to navigate between pages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      const prediction = response.data.prediction;

      // Navigate to Result page and pass prediction data
      navigate("/result", { state: { prediction } });
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gradient-to-br from-blue-100 to-transparent">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 shadow-md px-6 py-2 rounded-lg bg-white/80">
        ✈️ Flight Price Prediction
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-lg shadow-2xl rounded-xl p-8 w-full max-w-4xl space-y-6 border border-white/30"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[{ label: "Airline", name: "airline", options: ["SpiceJet", "AirAsia", "Vistara", "GO_FIRST", "Indigo", "Air_India"] },
            { label: "Source City", name: "source_city", options: ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Hyderabad", "Chennai"] },
            { label: "Departure Time", name: "departure_time", options: ["Evening", "Early_Morning", "Morning", "Afternoon", "Night", "Late_Night"] },
            { label: "Stops", name: "stops", options: ["zero", "one", "two_or_more"] },
            { label: "Arrival Time", name: "arrival_time", options: ["Night", "Morning", "Early_Morning", "Afternoon", "Evening", "Late_Night"] },
            { label: "Destination City", name: "destination_city", options: ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Hyderabad", "Chennai"] },
            { label: "Class", name: "class", options: ["Economy", "Business"] }
          ].map((field) => (
            <div key={field.name} className="bg-white/70 shadow-md border border-white/30 backdrop-blur-lg rounded-xl p-4 flex flex-col transition transform hover:-translate-y-1 hover:shadow-lg">
              <label className="block text-sm font-semibold text-gray-700">{field.label}</label>
              <select name={field.name} value={formData[field.name]} onChange={handleChange} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white/60 backdrop-blur-md">
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}

          {/* Departure Date Field */}
          <div className="bg-white/70 shadow-md border border-white/30 backdrop-blur-lg rounded-xl p-4 flex flex-col transition transform hover:-translate-y-1 hover:shadow-lg">
            <label className="block text-sm font-semibold text-gray-700">Departure Date</label>
            <input type="date" name="departure_date" min={new Date().toISOString().split("T")[0]} value={formData.departure_date} onChange={handleChange} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white/60 backdrop-blur-md"/>
          </div>
        </div>

        <button type="submit" className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:opacity-90 transition transform hover:-translate-y-1">
          🚀 Predict Price
        </button>
      </form>
    </div>
  );
}

export default FlightPricePredictor;
