/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ['./src/**/*.{js,jsx,html}'],
  theme: {
    extend: {
      colors: {
        footerGray: '#f3f2f0',
        LinkedInBlue: '#0a66c2',
        CrimsonRed: '#b24020',
        postButtonColor: '#004182',
        likeColor: '#378FE9',
        OpenToWork: '#DDE7F1',
        picForm: '#1b1f23',
        gold: '#E9A53F',
        LightGold: '#f2b65c',
        verifyColor: '#FFF4D2',
        LightMode: '#e7e3db',
        DarkMode: '#1D2226',
        premiumColor: '#C37D16',
        lightPremiumColor: '#F9C982',
        PremiumGray: '#EAE6DF',
      },
      fontFamily: {},
      screens: {
        CustomScreen: '500px',
        Laptop: '800',
      },
    },
  },
  plugins: [],
};
