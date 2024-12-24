/** @format */

import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/sllices/userSlice';

export function useUser() {
	const user = useSelector(selectUser);

	return { user };
}
