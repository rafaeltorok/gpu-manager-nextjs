import { createGpu } from "@/app/actions/gpus";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add new | GPUs Manager",
};

// Render each row of the form
function renderRow(
  label: string,
  type: string,
  name: string,
  required: boolean,
) {
  return (
    <div className="flex justify-center space-y-1 text-left">
      <label className="w-1/2 font-bold">{label}</label>
      {required ? (
        <input
          className="w-1/2 bg-black mb-1 p-0.5 border-1 border-gray-900"
          type={type}
          name={name}
          required
        />
      ) : (
        <input
          className="w-1/2 bg-black mb-1 p-0.5 border-1 border-gray-900"
          type={type}
          name={name}
        />
      )}
    </div>
  );
}

// Server component
export default async function AddGpu() {
  return (
    <div>
      <h2 className="text-center p-6 text-xl font-bold">
        Add new graphics card
      </h2>

      <form
        action={createGpu}
        className="w-full max-w-[400px] mx-auto border-1 border-gray-700 p-3 rounded"
      >
        {renderRow("Manufacturer", "text", "manufacturer", true)}
        {renderRow("Line", "text", "gpuline", false)}
        {renderRow("Model", "text", "model", true)}
        {renderRow("Cores", "number", "cores", true)}
        {renderRow("TMUs", "number", "tmus", true)}
        {renderRow("ROPs", "number", "rops", true)}
        {renderRow("VRAM (in GB)", "number", "vram", true)}
        {renderRow("Bus Width", "number", "bus", true)}
        {renderRow("Memory Type", "text", "memtype", true)}
        {renderRow("Base Clock (in MHz)", "number", "baseclock", true)}
        {renderRow("Boost Clock (in MHz)", "number", "boostclock", true)}
        {renderRow("Memory Clock (in Gbps)", "number", "memclock", true)}

        <button
          type="submit"
          className="w-full mt-1 px-1 py-1 bg-black font-bold border-1 border-gray-700 hover:bg-gray-900 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
}
