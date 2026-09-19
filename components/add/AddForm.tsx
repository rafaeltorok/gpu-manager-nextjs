"use client";

import { useState } from "react";

// Components
import Notification from "../Notification";

// TypeScript types
interface AddFormProps {
  createGpu: (formData: FormData) => void;
}

export default function AddForm({ createGpu }: AddFormProps) {
  // Display a UI notification to prevent the user from modifying any data
  // while the form action is running
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div>
      <form
        action={createGpu}
        onSubmit={() => setShowMessage(true)}
        className="w-full max-w-[400px] mx-auto border-1 border-gray-700 p-3 rounded bg-black/50"
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
          className="
            w-full
            mt-1
            px-1 py-1
            bg-black/50 active:bg-gray-700 hover:bg-gray-900 disabled:bg-black
            disabled:text-gray-700
            font-bold
            border-1 border-gray-700 disabled:border-gray-900
            rounded
          "
        >
          Add
        </button>
      </form>

      <Notification
        showMessage={showMessage}
        message="Sending data, please wait..."
      />
    </div>
  );
}

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
