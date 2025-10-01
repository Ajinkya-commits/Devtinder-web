import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addRequests } from "../../utils/requestSlice";
import { useEffect } from "react";
import axios from "axios";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1>No requests Found</h1>;

  return (
    <div className="text-center  my-10">
      <h1 className="text-bold text-white text-3xl pb-2">
        Connections Requests
      </h1>

      {requests.map((req) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          req.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center p-4 rounded-lg bg-base-300 w-2/3 m-auto"
          >
            <div>
              <img src={photoUrl} alt="" className="w-20 h-20 rounded-full" />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p> {age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="card-actions justify-center my-4">
              <button className="btn btn-error">Reject</button>
              <button className="btn btn-success">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
