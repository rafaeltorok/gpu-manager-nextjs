export default function ListLoading() {
  return (
    <div className="animate-pulse">
      <h1
        className="
          my-5
          text-2xl text-center
          text-gray-300 dark:text-gray-600/50
          font-bold
        "
      >
        Loading graphics cards...
      </h1>

      <div className="min-w-[300px] w-[350px] max-w-[80%] sm:max-w-[350px] mx-auto">
        {/* List items skeleton */}
        <div className="flex flex-col gap-1">
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div
        className="
          w-[350px] h-[40px]
          bg-gray-600 dark:bg-gray-900
          mt-5 mb-5 mx-auto
          rounded-xl
        "
      />
    </div>
  );
}

// Helper functions
function renderListItemSkeleton() {
  return (
    <div
      className="
        rounded
        bg-gray-500/75 dark:bg-gray-800/75
        h-[50px]
      "
    />
  );
}
