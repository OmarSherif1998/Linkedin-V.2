import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useThemeClasses from '../../../../../hooks/useThemeClasses';
function DottedButton() {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  return (
    <button
      className={`flex size-[2rem] items-center rounded-full border border-gray-500 p-2 text-gray-600 ${textColorClass} ${hoverColorClass} `}
    >
      <MoreHorizIcon
        sx={{
          fontSize: {
            xs: 14,
            md: 16,
            lg: 18,
            xl: 15,
          },
        }}
      />
    </button>
  );
}

export default DottedButton;
