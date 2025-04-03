import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigation } from "../../hooks/useNavigation.js";
import { LocalPendingRequests } from "../../functions/LocalPendingRequests.js";
import { calcDates } from "../../functions/calcDates";
import { addPendingRequest } from "../../Redux/sllices/connectionSlice";
import PendingButton from "../Buttons/PendingButton";
import ConnectButton from "../Buttons/ConnectButton";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPendingRequestList,
  sendConnectionRequest,
} from "../../api/connectionAPI.js";

const PostHeader = ({ postData, user }) => {
  const dispatch = useDispatch();
  const { NavigateToProfile, NavigateToVisitedProfile } = useNavigation();
  const queryClient = useQueryClient();
  const { data: pendingRequests = [] } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: () => getPendingRequestList(user._id),
  });

  const isCurrentUser = postData?.user === user?._id;
  const isOwnPost = user?._id === postData.user;
  const hasPendingRequest = pendingRequests.some(
    (request) => request.receiver === postData.user,
  );

  const handleConnection = async () => {
    try {
      const response = await sendConnectionRequest(user._id, postData.user);
      if (response.status === 200) {
        queryClient.invalidateQueries(["pendingRequests"]);
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

  const routeToProfile = () => {
    isCurrentUser
      ? NavigateToProfile()
      : NavigateToVisitedProfile(postData.user);
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

      {isOwnPost ? null : hasPendingRequest ? (
        <PendingButton />
      ) : (
        <ConnectButton Connection={handleConnection} />
      )}
    </section>
  );
};

export default PostHeader;
