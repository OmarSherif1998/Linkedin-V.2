/** @format */

//import './CSS/App.css';
import Login from './Login';
import LHeader from '../components/LHeader';
import Footer from '../components/Footer.jsx';
import Feed from '../pages/Feed';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Connection from '../components/Connection.jsx';
//import BinarySort from './BinarySort.jsx';

function App() {
	const user = true;

	return (
		<div
			className={`flex flex-col items-center min-h-screen ${
				user ? 'bg-BgColor' : ' bg-white'
			}`}
		>
			{!user ? (
				<>
					<LHeader />
					<Login />
					<Footer />
				</>
			) : (
				<>
					<Header />
					<div className='flex justify-center mt-[1.875rem] gap-[1.25rem] w-[90%]  '>
						<Sidebar />
						<Feed />
						{/* <BinarySort /> */}
						<Connection />
					</div>
				</>
			)}
		</div>
	);
}
export default App;
