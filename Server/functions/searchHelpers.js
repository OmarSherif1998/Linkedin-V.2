import Company from '../schema/company.js';
import CompanyFollowers from '../schema/CompanyFollowers.js';
import Job from '../schema/jobs.js';
import Post from '../schema/post.js';
import University from '../schema/university.js';
import User from '../schema/user.js';

export const getSearchResults = async (searchParam, exclude) => {
	const regex = new RegExp(searchParam, 'i');

	const [company, university, users, jobs, posts] = await Promise.all([
		Company.findOne({ name: regex }).select(
			'_id name profilePicture industry followers location.city location.country',
		),

		University.findOne({ name: regex }).select(
			'_id name city country profilePicture bio',
		),

		User.find({
			_id: { $ne: exclude },
			$or: [
				{ firstName: regex },
				{ lastName: regex },
				{ bio: regex },
				{ 'experiences.name': regex },
			],
		}),

		Job.find({
			$or: [
				{ title: regex },
				{ location: regex },
				{ type: regex },
				{ department: regex },
				{ description: regex },
				{ responsibilities: regex },
				{ qualifications: regex },
				{ skills: regex },
			],
		})
			.limit(5)
			.select('_id title location type ')
			.populate({ path: 'company', select: '_id name profilePicture ' }),

		Post.find({ content: regex })
			.limit(3)
			.select('_id content commentsCount likesCount createdAt likedBy ')
			.populate({
				path: 'user',
				select: '_id firstName lastName profilePicture bio ',
			})
			.populate({ path: 'comments' }),
	]);

	return { company, university, users, jobs, posts };
};

export const attachIsFollowingToCompany = async (company, userId) => {
	if (!company || !userId) return company;

	const isFollowing = await CompanyFollowers.exists({
		userId,
		companyId: company._id,
	});
	const plainCompany =
		typeof company.toObject === 'function'
			? company.toObject()
			: { ...company };
	plainCompany.isFollowing = Boolean(isFollowing);
	return plainCompany;
};

export const isEmptySearchResults = ({
	users,
	posts,
	jobs,
	university,
	company,
}) => {
	return (
		(!users || users.length === 0) &&
		(!posts || posts.length === 0) &&
		(!jobs || jobs.length === 0) &&
		!university &&
		!company
	);
};
