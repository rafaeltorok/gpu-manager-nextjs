export default function GpuTableLoading() {
  return (
    <div className="animate-pulse">
      <div
        className="
          w-full
          min-w-[300px] max-w-[400px] lg:max-w-[900px] md:max-w-[700px] sm:max-w-[600px]
          border-5 border-gray-700/50 rounded-xl
          mx-auto my-6
          wrap-break-word
        "
      >
        <div
          className="
            bg-gray-700/50 dark:bg-gray-900/75
            rounded-tl-xl rounded-tr-xl
            text-center text-2xl text-gray-500
            p-5
          "
        >
          Loading data...
        </div>

        {/* Wrapper for the data section of the table */}
        <div 
          className="
            sm:flex sm:grid sm:grid-cols-3
            lg:h-[250px] sm:h-[300px]
          "
        >
          {/* Specifications section */}
          <div className="sm:flex sm:flex-col flex-row">
            {renderHeader()}
            {renderDataSection()}
          </div>

          {/* Clock speeds section */}
          <div className="sm:flex sm:flex-col">
            {renderHeader()}
            {renderDataSection()}
          </div>

          {/* Theoretical Performance section */}
          <div className="sm:flex sm:flex-col">
            {renderHeader()}
            {renderDataSection()}
          </div>
        </div>

        {/* Table controls */}
        <div
          className="
            flex flex-col sm:flex-row gap-1
            h-[35px] w-full
            m-1 mx-auto
            bg-gray-600/50 dark:bg-gray-800/75
            rounded-xl
          "
        />
      </div>
    </div>
  );
}

function renderHeader() {
  return <div className="bg-gray-600/50 dark:bg-gray-800/75 text-center h-[45px] w-full" />;
}

function renderDataSection() {
  return <div className="bg-gray-700 dark:bg-gray-900 h-[150px] sm:h-[250px] lg:h-[200px] m-1 rounded" />;
}
