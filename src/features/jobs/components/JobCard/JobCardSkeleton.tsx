const JobCardSkeleton = () => (
  <div
    aria-hidden="true"
    className="min-w-75 w-full max-w-[375.5px] animate-pulse space-y-8 rounded-[8px] bg-[#F9F9F9] p-4 sm:min-w-[375.5px]"
  >
    <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2.5">
      <div className="h-6 w-28 rounded-full bg-[#E4E7E5]" />
      <div className="size-9 rounded-lg bg-[#E4E7E5]" />
    </div>
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-44 rounded bg-[#E4E7E5]" />
          <div className="h-3 w-52 rounded bg-[#ECEEED]" />
        </div>
        <div className="h-4 w-20 rounded bg-[#E4E7E5]" />
      </div>
      <div className="h-9 rounded bg-[#E4E7E5]" />
      <div className="flex items-center justify-between">
        <div className="h-9 w-40 rounded bg-[#E4E7E5]" />
        <div className="h-8 w-20 rounded bg-[#E4E7E5]" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2.5">
      <div className="h-8 rounded bg-[#E4E7E5]" />
      <div className="h-8 rounded bg-[#E4E7E5]" />
    </div>
  </div>
);

export default JobCardSkeleton;
