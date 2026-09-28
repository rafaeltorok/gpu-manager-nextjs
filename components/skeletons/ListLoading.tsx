export default function ListLoading() {
  return (
    <div className="mx-auto text-center animate-pulse">
      <h1
        className="
          mx-auto mt-8 mb-2
          text-2xl text-center
          text-gray-300 dark:text-gray-600
          font-bold
        "
      >
        Loading available graphics cards...
      </h1>

      <div className="w-[300px] mx-auto text-center">
        {/* Search Bar skeleton */}
        <div className="mx-auto text-center">
          <input
            className="bg-gray-400 dark:bg-gray-700 p-4 mx-auto my-2 rounded"
            disabled
          />
        </div>

        {/* List items skeleton */}
        <div className="flex flex-col mx-auto text-center gap-0.5 items-center align-center">
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
      <div className="inline-flex mt-3 mb-5">
        {/* Left nav arrow skeleton */}
        <div
          className="
            h-10 w-10
            rounded-md border border-gray-700
            mr-2 md:mr-4
            bg-gray-600 dark:bg-gray-900
          "
        />

        {/* Page numbers skeleton */}
        <div className="flex -space-x-px">
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
        </div>

        {/* Right nav arrow skeleton */}
        <div
          className="
            h-10 w-10
            rounded-md border border-gray-700
            ml-2 md:ml-4
            bg-gray-600 dark:bg-gray-900
          "
        />
      </div>
    </div>
  );
}

// Helper functions
function renderListItemSkeleton() {
  return (
    <div
      className="
        my-1
        py-6 px-10
        min-w-[300px] sm:min-w-[350px] w-[350px] max-w-[80%]
        border-1 border-gray-700 rounded
        bg-gray-600 dark:bg-gray-900
      "
    />
  );
}

function renderPageNumberSkeleton() {
  return (
    <div
      className="
        h-10 w-10
        border border-gray-700
        bg-gray-600 dark:bg-gray-900
        first:rounded-l-md last:rounded-r-md
      "
    />
  );
}
