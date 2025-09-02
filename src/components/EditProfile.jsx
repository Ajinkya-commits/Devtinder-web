import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      console.log(res?.data?.data);

      dispatch(addUser(res.data));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="flex justify-center flex-wrap">
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">FirstName</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">LastName</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">PhotoUrl</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
            <div className="card-actions justify-center">
              <button onClick={saveProfile} className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-10 mx-10">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
