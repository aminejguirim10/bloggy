import { Skeleton } from "@/components/ui/skeleton"

const CardSkeleton = () => {
  return (
    <div className="flex h-96 w-72 animate-pulse flex-col gap-4 rounded-xl shadow-2xl">
      <div className="h-48 w-full rounded-t-xl bg-gray-200"></div>
      <div className="flex items-center gap-3 px-5">
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        <div>
          <div className="h-4 w-16 rounded bg-gray-200"></div>
          <div className="mt-1 h-4 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-1 px-5">
        <div className="flex items-center justify-between">
          <div className="h-4 w-full rounded bg-gray-200"></div>
        </div>
        <div className="mt-2 h-32 rounded bg-gray-200"></div>
      </div>
    </div>
  )
}

export default CardSkeleton
