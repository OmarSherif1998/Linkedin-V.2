import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

import { useNavigation } from "../../hooks/useNavigation.js";
import useLoading from "../../hooks/useLoading";
import { sendConnectionRequest } from "../../api/connectionAPI";
import { LocalPendingRequests } from "../../functions/LocalPendingRequests.js";
import { calcDates } from "../../functions/calcDates";
import {
  addPendingRequest,
  selectPendingRequests,
} from "../../Redux/sllices/connectionSlice";

import PendingButton from "../Buttons/PendingButton";
import ConnectButton from "../Buttons/ConnectButton";

const PostHeader = ({ postData, user }) => {
  const [isPending, setIsPending] = useState(false);
  const { loading, setLoading } = useLoading();
  const dispatch = useDispatch();
  const pendingRequests = useSelector(selectPendingRequests);
  const { NavigateToProfile, NavigateToVisitedProfile } = useNavigation();

  // Check if the user is in the pending requests list
  useEffect(() => {
    setIsPending(pendingRequests?.includes(postData.user));
  }, [pendingRequests, postData.user]);

  // Handle sending a connection request
  const handleConnection = async () => {
    try {
      const response = await sendConnectionRequest(user._id, postData.user);
      if (response.status === 200) {
        setIsPending(true);
        dispatch(addPendingRequest(postData.user));
        LocalPendingRequests(user._id, postData.user);
      }
    } catch (error) {
      console.error(
        "CLIENT ERROR: Error sending connection request:",
        error.message,
      );
    }
  };

  // Navigate to profile or visited profile
  const routeToProfile = () => {
    setLoading(true);
    postData?.user === user?._id
      ? NavigateToProfile()
      : NavigateToVisitedProfile(postData.user);
    setLoading(false);
  };

  return (
    <section className="mb-[0.625rem] flex items-center gap-2">
      <Avatar src={postData?.profilePicture} />
      <div className="flex flex-col justify-start">
        <h2
          onClick={routeToProfile}
          className="cursor-pointer text-[0.9375rem] font-normal text-black hover:text-blue-600 hover:underline"
        >
          {postData?.username}
        </h2>
        <p
          onClick={routeToProfile}
          className="cursor-pointer text-[0.65rem] text-gray-500"
        >
          {postData?.bio}
        </p>
        <time className="flex items-center gap-1 text-[0.65rem] text-gray-500">
          {postData?.createdAt ? calcDates(postData.createdAt) : null} ago •{" "}
          <PublicIcon style={{ fontSize: "0.9rem" }} />
        </time>
      </div>

      {/* Connection Logic */}
      {postData?.user === user?._id ||
      user.connections.includes(postData.user) ? null : isPending ? (
        <PendingButton />
      ) : (
        <ConnectButton Connection={handleConnection} />
      )}
    </section>
  );
};

export default PostHeader;
