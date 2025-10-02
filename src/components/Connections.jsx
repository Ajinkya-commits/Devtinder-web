import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="flex justify-center my-4">No Connection Found</h1>;

  return (
    <div className="text-center  my-10">
      <h1 className="text-bold text-white text-3xl pb-2">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex items-center gap-4 p-4 rounded-lg bg-base-300 sm:w-1/2 w-2/3 m-auto my-4"
          >
            <img
              src={photoUrl}
              alt={firstName}
              className="w-20 h-20 rounded-full object-cover"
            />

            <div className="flex-1 text-left">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p className="break-words">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
