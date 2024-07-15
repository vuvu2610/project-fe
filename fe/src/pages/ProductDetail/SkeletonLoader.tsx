import StarRating from "../../components/StarRating";

const SkeletonLoader = () => {
  return (
    <>
      <div className=" w-[300px] mx-auto grid">
        <img
          src="https://via.placeholder.com/300"
          alt=""
          className="w-full rounded-[20px] animate-gradient"
        />
      </div>

      <div className="flex-1">
        <div className="text-[40px] mb-3 line-clamp-2 animate-gradient w-80 h-6 bg-[#d2d2d2]"></div>
        <div className="flex gap-x-2 items-center mt-2">
          <StarRating rating={5} />
          <span className="animate-gradient w-12 h-4 bg-[#d2d2d2]"></span>
        </div>
        <span className="my-3 block animate-gradient w-60 h-4 bg-[#d2d2d2]"></span>
        <p className="animate-gradient w-52 h-4 bg-[#d2d2d2]"></p>
        <p className="mt-8 border-b animate-gradient"></p>
        <div className="flex animate-gradient w-52 h-16 bg-[#d2d2d2] mt-10"></div>
      </div>
    </>
  );
};
export default SkeletonLoader;
