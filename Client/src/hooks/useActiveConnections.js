import { useSelector } from "react-redux";
import { selectActiveConnections } from "../Redux/sllices/activeConnectionSlice";

export default function useActiveConnections() {
  const activeConnections = useSelector(selectActiveConnections);
  return activeConnections;
}
