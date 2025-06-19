import { useSelector } from 'react-redux';
import { selectTheme } from '../Redux/sllices/themeSlice';

export default function useThemeClasses() {
  const theme = useSelector(selectTheme);
  return { ...theme };
}
