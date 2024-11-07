import React, { useEffect, useState } from "react";
import Testimonial from "../../Components/Testimonial/Testimonial";
import DoctorCard from "./DoctorCard";

import { BASE_URL } from "../../config.js";
import useFetchData from "./../../Hooks/UseFetchData.jsx";
import Loader from "../../Components/Loading.jsx";
import Error from "../../Components/Error/Error.jsx";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [deBounceQuery, setDebounceQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Fetching data using the debounce query
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${deBounceQuery}`);

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleGetLocation = () => {
    // For demonstration purposes, let's assume we have user's location
    const userLocation = { latitude: 123, longitude: 456 };

    if (doctors?.length) {
      const filteredResults = doctors.filter((doctor) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          doctor.latitude,
          doctor.longitude
        );

        return distance < 50; // Filter doctors within 50 kilometers
      });

      setFilteredDoctors(filteredResults);
    }
  };

  // Function to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <div>
            <h2 className="heading">Find a Doctor</h2>
            <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
              <input
                type="search"
                placeholder="Search Doctor Here"
                className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                className="btn mt-0 rounded-[0px] rounded-r-md bg-blue-500 hover:bg-blue-700 text-white"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              className="btn mt-0 rounded-[8px] rounded-r-md bg-green-500 hover:bg-green-700 text-white"
              onClick={handleGetLocation}
            >
              Get My Location
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {(filteredDoctors.length > 0 ? filteredDoctors : doctors).map(
                (doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                )
              )}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health system offers unmatched,
              expert health care
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
