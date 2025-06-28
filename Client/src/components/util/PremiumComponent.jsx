import { BiSolidSquareRounded } from 'react-icons/bi';

function PremiumComponent({ size = 'size-5' }) {
  return (
    <BiSolidSquareRounded
      className={`${size} rounded-md bg-gradient-to-r from-yellow-400 via-yellow-600 to-amber-700 text-transparent`}
    />
  );
}

export default PremiumComponent;
