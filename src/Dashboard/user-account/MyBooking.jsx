import useFetchData from "../../Hooks/UseFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from './../../Pages/Doctors/DoctorCard';
import Loading from "../../Components/Loading";
import Error from "../../Components/Error/Error";

const MyBooking = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <>
          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {appointments.map(doctor => (
                <DoctorCard doctor={doctor} key={doctor._id} />
              ))}
            </div>
          ) : (
            <h2 className="mt-5 text-center leading-7 text-7 text-[20px] font-semibold text-primaryColor">
              You didn't book any doctor yet!
            </h2>
          )}
        </>
      )}
    </div>
  );
};

export default MyBooking;
