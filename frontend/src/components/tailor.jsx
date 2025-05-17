// TailorRegistration.js
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";  // your Firebase config file
import { UserIcon, PhoneIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

const TailorRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "tailors"), {
        name: formData.name,
        experience: formData.experience,
        phone: formData.phone,
        createdAt: new Date(),  // timestamp for record keeping
      });

      alert("Tailor Registered Successfully!");
      setFormData({ name: "", experience: "", phone: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to register tailor.");
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-700">Tailor Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Tailor Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <BriefcaseIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <PhoneIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register Tailor
          </button>
        </form>
      </div>
    </div>
  );
};

export default TailorRegistration;
