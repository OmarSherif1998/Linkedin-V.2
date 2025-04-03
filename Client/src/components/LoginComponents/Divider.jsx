function Divider() {
  return (
    <div className="my-4 flex w-full items-center lg:w-[80%]">
      <div className="flex-1 border-t border-gray-300 sm:w-1/2 md:flex-none 2xl:w-1/3"></div>
      <span className="px-2">or</span>
      <div className="flex-1 border-t border-gray-300 sm:w-1/2 md:flex-none 2xl:w-1/3"></div>
    </div>
  );
}

export default Divider;
