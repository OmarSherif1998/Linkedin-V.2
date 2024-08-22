/** @format */

import Carousel from '../components/LoginComponents/Carousel';
import Connect from '../components/LoginComponents/Connect';
import Find from '../components/LoginComponents/Find';
import Form from '../components/LoginComponents/Form';
import GetStarted from '../components/LoginComponents/GetStarted';
import Internship from '../components/LoginComponents/Internship';
import PostJob from '../components/LoginComponents/PostJob';

function Login() {
	return (
		<div>
			<Form />
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
