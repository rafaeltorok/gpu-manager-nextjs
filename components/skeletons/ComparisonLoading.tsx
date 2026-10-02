export default function ComparisonLoading() {
  return (
    <div className="animate-pulse">
      {/* Loading message on the top of the page */}
      <div
        className="
          text-center text-2xl font-bold
          text-gray-200 dark:text-gray-500/75
          my-3
        "
      >
        Loading comparison page...
      </div>

      {/* Wrapper for the comparison selection form */}
      <div
        className="
          w-full sm:w-[400px]
          mt-2 mb-10 mx-auto
        "
      >
        {/* Comparison selection */}
        <div
          className="
            flex flex-col gap-2
            bg-black/75
            rounded-xl
            mx-auto
            p-5
          "
        >
          {/* Wrapper for the cards selection fields */}
          <div className="mb-2 mt-9 flex flex-col gap-9">
            {/* First card selection */}
            {renderSelectionField()}

            {/* Second card selection */}
            {renderSelectionField()}
          </div>

          {/* Selection buttons */}
          <div
            className="
              h-[100px]
              rounded-xl
              bg-gray-700 dark:bg-gray-900/75
            "
          />
        </div>
      </div>

      {/* Wrapper for the comparison table */}
      <div
        className="
          flex flex-col
          min-w-[300px] max-w-[500px]
          mx-auto
          rounded-xl
          bg-black/75
          p-2
        "
      >
        {/* Comparison title section */}
        <div
          className="
            w-full
            p-11
            bg-gray-700 dark:bg-gray-900/50
            rounded-t-xl
          "
        />

        {/* Specifications section */}
        <div className="flex flex-col">
          {renderSectionHeader()}
          {renderSection()}
        </div>

        {/* Clock speeds section */}
        <div className="flex flex-col">
          {renderSectionHeader()}
          {renderSection()}
        </div>

        {/* Theoretical performance section */}
        <div className="flex flex-col">
          {renderSectionHeader()}
          {renderSection()}
        </div>

        {/* Override controls */}
        {renderSectionHeader()}
        <div
          className="
            h-[35px] w-full
            bg-gray-700 dark:bg-gray-900/75
            border-1 border-gray-700/25
            rounded-xl
            my-1
          "
        />
      </div>
    </div>
  );
}

function renderSelectionField() {
  return (
    <div className="flex bg-gray-600 dark:bg-gray-900/75 rounded h-[45px]" />
  );
}

function renderSectionHeader() {
  return <div className="bg-gray-600 dark:bg-gray-800/75 w-full h-[45px]" />;
}

function renderSection() {
  return <div className="h-[150px] bg-gray-700 dark:bg-gray-900/75 w-full" />;
}
