import mongoose from 'mongoose';

const companyFollowersSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		companyId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company',
			required: true,
			index: true,
		},
		followedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt
	},
);
companyFollowersSchema.statics.isFollowing = function (userId, companyId) {
	return this.exists({ userId, companyId });
};
// Prevent duplicate follows (a user can follow a company only once)
companyFollowersSchema.index({ userId: 1, companyId: 1 }, { unique: true });
const CompanyFollowers = mongoose.model(
	'CompanyFollowers',
	companyFollowersSchema,
);

export default CompanyFollowers;
