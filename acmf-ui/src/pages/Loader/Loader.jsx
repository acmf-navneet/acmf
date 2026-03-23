import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
  return (
    <div data-testid="loader" className="flex h-screen">
      <div className="w-1/5 p-5">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>

      <div className="flex-1">
        <div className="w-full p-5 mb-5">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        <div className="space-y-4 p-5">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
            <Skeleton key={index} className="h-[10vh] w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
