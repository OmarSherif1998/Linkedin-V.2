const LoadingSpinner = ({ spinnerSize = 5, componentName }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        componentName === 'VerificationCodeForm' ? 'p-0' : 'p-4'
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-full border-2 border-gray-400 size-${spinnerSize} animate-spin border-t-transparent text-black`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
