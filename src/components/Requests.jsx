import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addRequests, removeRequest } from "../../utils/requestSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const [showButtons, setShowButtons] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {}
  };

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
  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No requests Found</h1>;

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
            className="flex items-center gap-4 p-4 rounded-lg bg-base-300 w-1/2 m-auto my-4"
          >
            <div>
              <img
                src={photoUrl}
                alt=""
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p> {age + ", " + gender}</p>}
              <p className="break-words">{about}</p>
            </div>
            <div className="card-actions justify-center my-4">
              <button
                className="btn btn-error"
                onClick={() => reviewRequest("rejected", req._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-success"
                onClick={() => reviewRequest("accepted", req._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
