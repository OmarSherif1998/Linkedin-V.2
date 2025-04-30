const LoadingSpinner = ({ spinnerSize = 5 }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`border-gary-800 rounded-full border-2 size-${spinnerSize} animate-spin border-t-transparent`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
