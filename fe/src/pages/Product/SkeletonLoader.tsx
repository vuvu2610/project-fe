const SkeletonLoader = () => {
  return (
    <div className=" w-full grid grid-cols-3 gap-4 transition-all duration-300">
      <div className="w-[300px] h-[300px] bg-gray-300 rounded-[20px] animate-gradient"></div>
      <div className="w-[300px] h-[300px] bg-gray-300 rounded-[20px] animate-gradient"></div>
      <div className="w-[300px] h-[300px] bg-gray-300 rounded-[20px] animate-gradient"></div>
      <div className="w-[300px] h-[300px] bg-gray-300 rounded-[20px] animate-gradient"></div>
      <div className="w-[300px] h-[300px] bg-gray-300 rounded-[20px] animate-gradient"></div>
      <div className="w-[300px] h-[300px] bg-gray-300 rounded-[20px] animate-gradient"></div>
    </div>
  );
};
export default SkeletonLoader;
