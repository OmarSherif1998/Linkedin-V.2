import baseButtonClasses from '../../../../../staticData/baseButtonClasses';

function MoreButton() {
  return (
    <button className={`${baseButtonClasses} hover:bg-gray-100 sm:px-5`}>
      More
    </button>
  );
}

export default MoreButton;
