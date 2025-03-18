/** @format */

import Carousel from "./Carousel";
import Connect from "./Connect";
import Find from "./Find";
import LoginForm from "./LoginForm";
import GetStarted from "./GetStarted";
import Internship from "./Internship";
import PostJob from "./PostJob";

function Login() {
  return (
    <div>
      <LoginForm />
      <Internship />
      <PostJob />
      <Carousel />
      <Connect />
      <Find />
      <GetStarted />
    </div>
  );
}
export default Login;
