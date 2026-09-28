export default function GpuTableLoading() {
  return (
    <div className="animate-pulse">
      <div
        className="
          w-full
          min-w-[300px] max-w-[400px] lg:max-w-[900px] md:max-w-[700px] sm:max-w-[600px]
          border-5 border-gray-700/50
          mx-auto my-6
          rounded-xl
          wrap-break-word
        "
      >
        <div
          className="
            bg-gray-700/50 dark:bg-gray-900/75
            p-5
            rounded-tl-xl rounded-tr-xl
            text-center text-2xl
            text-gray-500
          "
        >
          Loading graphics card data...
        </div>

        {/* Wrapper for the data section of the table */}
        <div className="sm:grid sm:grid-cols-3 lg:h-[250px] sm:h-[300px]">
          {/* Wrapper for the Specifications section */}
          <div className="sm:flex sm:flex-col">
            <div className="bg-gray-600/50 dark:bg-gray-900/75 text-center py-5 w-full" />
            {renderStandardRow()}
            {renderStandardRow()}
            {renderStandardRow()}
            {renderStandardRow()}
            {renderStandardRow()}
          </div>

          {/* Wrapper for the Clock speeds section */}
          <div className="sm:flex sm:flex-col">
            <div className="bg-gray-600/50 dark:bg-gray-900/75 text-center py-5 w-full" />
            {renderStandardRow()}
            {renderStandardRow()}
            {renderStandardRow()}
          </div>

          {/* Wrapper for the Performance section */}
          <div className="sm:flex sm:flex-col">
            <div className="bg-gray-600/50 dark:bg-gray-900/75 text-center py-5 w-full" />
            {renderStandardRow()}
            {renderStandardRow()}
            {renderStandardRow()}
            {renderStandardRow()}
          </div>
        </div>

        {/* Wrapper for the table controls */}
        <div
          className="
            flex flex-col
            sm:flex-row
            w-full
            my-1
            gap-1
          "
        >
          {renderControlButton()}
          {renderControlButton()}
          {renderControlButton()}
        </div>
      </div>
    </div>
  );
}

function renderStandardRow() {
  return (
    <div className="flex w-full sm:flex-1">
      <div
        className="
          bg-gray-600/50 dark:bg-gray-800/75
          border-1 border-gray-700/50
          px-2 py-4 w-2/5"
      />
      <div
        className="
          bg-gray-700/50 dark:bg-gray-900/75
          border-1 border-gray-700/50
          px-2 py-1 w-3/5
        "
      />
    </div>
  );
}

function renderControlButton() {
  return (
    <button
      type="button"
      className="
        w-full
        px-4 py-4
        bg-gray-600/50 dark:bg-gray-800/75
        border-1 border-gray-700/50
        rounded-xl
      "
      disabled
    />
  );
}
