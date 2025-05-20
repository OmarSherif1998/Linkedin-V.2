/** @format */

import { useSelector } from "react-redux";
import { selectUser } from "../Redux/sllices/userSlice";

export default function useUser() {
  const user = useSelector(selectUser);
  return { ...user };
}
