const getBasicProfile = (user) => {
	return {
		_id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		bio: user.bio,
		profilePicture: user.profilePicture,
	};
};
export default getBasicProfile;
