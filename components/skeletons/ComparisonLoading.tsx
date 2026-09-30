export default function ComparisonLoading() {
  return (
    <div className="animate-pulse mb-">
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
          min-w-[300px]
          max-w-[400px]
          mt-2
          mb-10
          mx-auto
          w-full
        "
      >
        {/* Comparison selection */}
        <div
          className="
            flex flex-col
            gap-2
            bg-black/50
            border-2 border-gray-700/75 rounded-xl
            p-5
          "
        >
          {/* Wrapper for the cards selection fields */}
          <div className="mb-2 mt-9 flex flex-col gap-9">
            {/* First card selection */}
            <div className="flex w-full border-2 border-gray-700/75 rounded py-5" />

            {/* Second card selection */}
            <div className="flex w-full border-2 border-gray-700/75 rounded py-5" />
          </div>

          {/* Confirm button */}
          <button
            type="button"
            className="
              border-2 border-gray-700/75 rounded-xl
              p-5
              bg-gray-700 dark:bg-gray-900/75
            "
            disabled
          />

          {/* Swap button */}
          <button
            type="button"
            className="
              border-2 border-gray-700/75 rounded-xl
              p-5
              bg-gray-700 dark:bg-gray-900/75
            "
            disabled
          />
        </div>
      </div>

      {/* Wrapper for the comparison table */}
      <div>
        <div
          className="
            flex flex-col
            overflow-auto
            min-w-[300px]
            max-w-[500px]
            mx-auto
            p-1
            border-4 border-gray-800/75 rounded-xl
            bg-black-75
          "
        >
          {/* Comparison title section */}
          <div
            className="
              w-full
              p-11
              bg-gray-700 dark:bg-gray-900/50
            "
          />

          {/* Specifications section */}
          <div className="bg-gray-600 dark:bg-gray-800/75 p-5 w-full" />
          <div className="flex flex-col">
            {renderRow()}
            {renderRow()}
            {renderRow()}
            {renderRow()}
            {renderRow()}
          </div>

          {/* Clock speeds section */}
          <div className="bg-gray-600 dark:bg-gray-800/75 p-5 w-full" />
          <div className="flex flex-col">
            {renderRow()}
            {renderRow()}
            {renderRow()}
          </div>

          {/* Theoretical performance section */}
          <div className="bg-gray-600 dark:bg-gray-800/75 p-5 w-full" />
          <div className="flex flex-col">
            {renderRow()}
            {renderRow()}
            {renderRow()}
            {renderRow()}
          </div>

          {/* Override controls */}
          <div className="bg-gray-600 dark:bg-gray-800/75 p-5 w-full" />
          <div className="flex my-1">
            <button
              type="button"
              disabled
              className="
                w-1/2
                p-4
                bg-gray-700 dark:bg-gray-900/75
                border-1 border-gray-700/25
                rounded-xl
              "
            />
            <button
              type="button"
              disabled
              className="
                w-1/2
                p-4
                bg-gray-700 dark:bg-gray-900/75
                border-1 border-gray-700/25
                rounded-xl
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function renderRow() {
  return (
    <div className="flex w-full">
      <div
        className="
          w-1/4
          py-5
          bg-gray-500 dark:bg-gray-700/25
          border-1 border-gray-700/25
        "
      />
      <div
        className="
          w-1/4
          py-5
          bg-gray-700 dark:bg-gray-900/75
          border-1 border-gray-700/25
        "
      />
      <div
        className="
          w-1/4
          py-5
          bg-gray-700 dark:bg-gray-900/75
          border-1 border-gray-700/25
        "
      />
      <div
        className="
          w-1/4
          py-5
          bg-gray-500 dark:bg-gray-700/25
          border-1 border-gray-700/25
        "
      />
    </div>
  );
}
