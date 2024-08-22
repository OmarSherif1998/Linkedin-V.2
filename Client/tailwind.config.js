/**
 * @format
 * @type {import('tailwindcss').Config}
 */

const { LinkedIn } = require('@mui/icons-material');

module.exports = {
	content: ['./src/**/*.{js,jsx,html}'],
	theme: {
		extend: {
			colors: {
				footerGray: '#f3f2f0',
				LinkedInBlue: '#0a66c2',
				CrimsonRed: '#b24020',
				BgColor: '#F4F2EE',
				postButtonColor: '#004182',
				likeColor: '#378FE9',
			},
		},
	},
	plugins: [],
};
