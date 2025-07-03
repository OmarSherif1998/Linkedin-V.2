const getFullProfile = (user) => {
	return {
		_id: user._id,
		username: `${user.firstName} ${user.lastName}`,
		bio: user.bio,
		email: user.email,
		phoneNumber: user.phoneNumber,
		city: user.city,
		country: user.country,
		connectionCount: user.connectionCount,
		postsCount: user.postsCount,
		commentsCount: user.commentsCount,
		profilePicture: user.profilePicture,
		coverPicture: user.coverPicture,
		licensesAndCertifications: user.licensesAndCertifications,
		experiences: user.experiences,
		education: user.education,
		skills: user.skills,
		posts: user.posts,
		comments: user.comments,
		about: user.about,
		verified: user.verified,
	};
};

export default getFullProfile;
