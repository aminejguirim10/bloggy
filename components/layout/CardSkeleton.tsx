import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 shadow-2xl w-72 rounded-xl animate-pulse h-96">
      <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
      <div className="flex px-5 gap-3 items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mt-1"></div>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-5 mb-4">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="h-32 bg-gray-200 rounded mt-2"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
