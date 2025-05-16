import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { PhoneIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const TailorList = () => {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTailors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tailors"));
        const tailorsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTailors(tailorsList);
      } catch (error) {
        console.error("Error fetching tailors: ", error);
      }
      setLoading(false);
    };

    fetchTailors();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg animate-pulse">
        Loading tailors...
      </p>
    );

  return (
    <div className="relative max-w-4xl mx-auto mt-12 px-6 py-10 bg-gradient-to-r from-indigo-50 via-white to-blue-50 rounded-3xl shadow-lg overflow-hidden">
      {/* Decorative SVG shapes */}
      <svg
        className="absolute top-0 left-0 w-40 h-40 opacity-10 text-indigo-300"
        fill="currentColor"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-48 h-48 opacity-10 text-blue-300"
        fill="currentColor"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <rect width="100" height="100" rx="20" />
      </svg>

      <h2 className="relative text-4xl font-extrabold text-center text-blue-700 mb-10">
        Registered Tailors
      </h2>

      {tailors.length === 0 ? (
        <p className="relative text-center text-gray-600 text-lg">
          No tailors registered yet.
        </p>
      ) : (
        <ul className="relative grid gap-8 md:grid-cols-2">
          {tailors.map((tailor) => (
            <li
              key={tailor.id}
              className="relative rounded-2xl p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-indigo-200 via-blue-100 to-white"
            >
              <div className="flex items-center space-x-3 mb-4">
                <UserGroupIcon className="w-8 h-8 text-indigo-700" />
                <h3 className="text-2xl font-bold text-indigo-900">{tailor.name}</h3>
              </div>

              <div className="mb-3">
                <span className="inline-block bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {tailor.experience} {parseInt(tailor.experience) === 1 ? "year" : "years"} experience
                </span>
              </div>

            <div>
  <a
    href={`https://wa.me/${tailor.phone.replace(/\D/g, "")}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-indigo-800 font-medium hover:text-green-600 transition-colors"
  >
    <PhoneIcon className="w-5 h-5 mr-2 text-indigo-600" />
    <span>{tailor.phone}</span>
  </a>
</div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TailorList;
