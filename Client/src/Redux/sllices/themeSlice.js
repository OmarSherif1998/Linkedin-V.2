import { createSlice } from '@reduxjs/toolkit';

const getSavedDarkMode = () => {
  const saved = localStorage.getItem('darkMode');
  if (saved === null) return false;
  return JSON.parse(saved);
};

const initialState = {
  darkMode: getSavedDarkMode(),
  borderClass: getSavedDarkMode() ? 'border-none' : 'border',
  borderColor: getSavedDarkMode() ? 'border-gray-600' : 'border-gray-200',
  backgroundClass: getSavedDarkMode() ? 'bg-black' : 'bg-LightMode',
  componentBGColorClass: getSavedDarkMode() ? 'bg-DarkMode' : 'bg-white',
  textColorClass: getSavedDarkMode() ? 'text-white' : 'text-black',
  iconColorClass: getSavedDarkMode() ? 'white' : 'black',
  hoverColorClass: getSavedDarkMode()
    ? 'hover:bg-gray-700'
    : 'hover:bg-gray-100',

  bgColorClass: getSavedDarkMode() ? 'bg-gray-800' : 'bg-gray-100',
  premiumCarouselTheme: getSavedDarkMode()
    ? 'bg-zinc-800 hover:hover:bg-zinc-700'
    : 'bg-PremiumGray bg-opacity-80 hover:bg-opacity-100',
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', JSON.stringify(action.payload));
      state.backgroundClass = action.payload ? 'bg-black' : 'bg-LightMode';
      state.componentBGColorClass = action.payload ? 'bg-DarkMode' : 'bg-white';
      state.textColorClass = action.payload ? 'text-white' : 'text-black';
      state.iconColorClass = action.payload ? 'white' : 'black';
      state.borderClass = action.payload ? 'border-none' : 'border';
      state.borderColor = action.payload
        ? 'border-gray-600'
        : 'border-gray-200';
      state.hoverColorClass = action.payload
        ? 'hover:bg-gray-800'
        : 'hover:bg-gray-100';
      state.bgColorClass = action.payload ? 'bg-gray-800' : 'bg-gray-100';
      state.premiumCarouselTheme = action.payload
        ? 'bg-zinc-800 hover:hover:bg-zinc-700'
        : 'bg-PremiumGray bg-opacity-80 hover:bg-opacity-100';
    },
  },
});

export const { setDarkMode } = themeSlice.actions;
export const selectTheme = (state) => state.theme;

export default themeSlice.reducer;
