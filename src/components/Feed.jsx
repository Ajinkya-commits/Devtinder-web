import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user); 
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log("Failed to fetch feed:", error);
    }
  };

  useEffect(() => {
    if (!user) return;       
    getFeed();                 
  }, [user]);                

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
