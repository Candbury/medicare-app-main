import DoctorCard from "./DoctorCard.jsx";

import { BASE_URL } from "../../config.js";
import useFetchData from './../../Hooks/UseFetchData.jsx';
import Loader from '../../Components/Loading.jsx';
import Error from '../../Components/Error/Error.jsx';

const DoctorsList = () => {

  const {data: doctors, loading, error} = useFetchData(`${BASE_URL}/doctors`)
  return (
    <>
    {loading && <Loader />}
    {error && <Error />}

    { !loading && !error && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lp:gap-[30px] mt-[30px] lg:mt-[55px]">
      {doctors.map(doctor=>(
        <DoctorCard key={doctor._id} doctor={{doctor}} />
      ))}
      </div>}
    </>
  );
};

export default DoctorsList;
