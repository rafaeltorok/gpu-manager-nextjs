import type { GpuType } from "@/types/gpu";

interface TitleProps {
  gpuData: GpuType;
  setGpuData: (data: GpuType) => void;
  editMode: boolean;
  gpuClass: string;
}

export default function Title({
  gpuData,
  setGpuData,
  editMode,
  gpuClass,
}: TitleProps) {
  return (
    <div
      className={`
        bg-black
        p-5
        text-2xl font-extrabold
        ${gpuClass}
        rounded-tl-xl rounded-tr-xl
        text-center
      `}
    >
      {editMode ? (
        <div
          className={`
            flex-col sm:flex-row
            w-full sm:w-[75%]
            mx-auto
            text-white
          `}
        >
          <input
            name="manufacturer"
            className="text-center sm:w-1/3 border-1 border-gray-600 rounded"
            type="text"
            value={gpuData.manufacturer || ""}
            onChange={(e) => {
              if (e.target.value.trim() !== "") {
                setGpuData({
                  ...gpuData,
                  manufacturer: e.target.value.trimStart(),
                });
              }
            }}
          />
          <input
            name="gpuline"
            className="text-center sm:w-1/3 border-1 border-gray-600 rounded"
            type="text"
            value={gpuData.gpuline || ""}
            onChange={(e) =>
              setGpuData({ ...gpuData, gpuline: e.target.value.trimStart() })
            }
          />
          <input
            name="model"
            className="text-center sm:w-1/3 border-1 border-gray-600 rounded"
            type="text"
            value={gpuData.model || ""}
            onChange={(e) => {
              if (e.target.value.trim() !== "") {
                setGpuData({ ...gpuData, model: e.target.value.trimStart() });
              }
            }}
          />
        </div>
      ) : (
        <div>
          {gpuData.manufacturer} {gpuData.gpuline} {gpuData.model}
        </div>
      )}
    </div>
  );
}
