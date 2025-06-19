import { createSlice } from '@reduxjs/toolkit';

const savedDarkMode = localStorage.getItem('darkMode');
const initialDarkMode = savedDarkMode ? JSON.parse(savedDarkMode) : false;

const initialState = {
  darkMode: initialDarkMode,
  borderClass: 'border',
  borderColor: 'border-gray-600',
  backgroundClass: initialDarkMode ? 'bg-black' : 'bg-LightMode',
  componentBGColorClass: initialDarkMode ? 'bg-DarkMode' : 'bg-white',
  textColorClass: initialDarkMode ? 'text-white' : 'text-black',
  iconColorClass: initialDarkMode ? 'white' : 'black',
  hoverColorClass: initialDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      // console.log(state.darkMode);
      localStorage.setItem('darkMode', state.darkMode);

      state.darkMode = action.payload;
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
    },
  },
});

export const { setDarkMode } = themeSlice.actions;
export const selectTheme = (state) => state.theme;

export default themeSlice.reducer;
