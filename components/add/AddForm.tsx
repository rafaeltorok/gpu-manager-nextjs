"use client";

import { useActionState } from "react";

// Actions
import { createGpu } from "@/app/actions/gpus";

// Components
import Notification from "../Notification";

// TypeScript types
import type { State } from "@/app/actions/gpus";

export default function AddForm() {
  // Handles the form validation messages
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createGpu,
    initialState,
  );

  return (
    <div>
      <form
        action={formAction}
        className="w-full max-w-[400px] mx-auto border-1 border-gray-700 p-3 rounded bg-black/50"
      >
        {renderRow(
          "Manufacturer",
          "text",
          "manufacturer",
          true,
          state?.values?.manufacturer,
          state?.errors?.manufacturer,
          "manufacturer-error",
        )}
        {renderRow("Line", "text", "gpuline", false, state?.values?.gpuline)}
        {renderRow(
          "Model",
          "text",
          "model",
          true,
          state?.values?.model,
          state?.errors?.model,
          "model-error",
        )}
        {renderRow(
          "Cores",
          "number",
          "cores",
          true,
          state?.values?.cores,
          state?.errors?.cores,
          "cores-error",
        )}
        {renderRow(
          "TMUs",
          "number",
          "tmus",
          true,
          state?.values?.tmus,
          state?.errors?.tmus,
          "tmus-error",
        )}
        {renderRow(
          "ROPs",
          "number",
          "rops",
          true,
          state?.values?.rops,
          state?.errors?.rops,
          "rops-error",
        )}
        {renderRow(
          "VRAM (in GB)",
          "number",
          "vram",
          true,
          state?.values?.vram,
          state?.errors?.vram,
          "vram-error",
        )}
        {renderRow(
          "Bus Width",
          "number",
          "bus",
          true,
          state?.values?.bus,
          state?.errors?.bus,
          "bus-error",
        )}
        {renderRow(
          "Memory Type",
          "text",
          "memtype",
          true,
          state?.values?.memtype,
          state?.errors?.memtype,
          "memtype-error",
        )}
        {renderRow(
          "Base Clock (in MHz)",
          "number",
          "baseclock",
          true,
          state?.values?.baseclock,
          state?.errors?.baseclock,
          "baseclock-error",
        )}
        {renderRow(
          "Boost Clock (in MHz)",
          "number",
          "boostclock",
          true,
          state?.values?.boostclock,
          state?.errors?.boostclock,
          "boostclock-error",
        )}
        {renderRow(
          "Memory Clock (in Gbps)",
          "number",
          "memclock",
          true,
          state?.values?.memclock,
          state?.errors?.memclock,
          "memclock-error",
        )}

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
        showMessage={isPending}
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
  defaultValue?: string,
  errors?: string[] | undefined,
  errorName?: string,
) {
  return (
    <div className="mb-1">
      <label
        className="flex flex-col w-full space-y-1 font-bold"
        htmlFor={name}
      >
        <span className="w-[90%] mx-auto mb-0">{label}</span>
        {required ? (
          <input
            className={`w-[80%] mx-auto bg-black mb-1 p-0.5 border-1 border-gray-700 ${errors && "border-red-500"}`}
            id={name}
            type={type}
            name={name}
            required
            aria-describedby={`${errorName}`}
            defaultValue={defaultValue}
          />
        ) : (
          <input
            className="w-[80%] mx-auto bg-black mb-1 p-0.5 border-1 border-gray-700"
            id={name}
            type={type}
            name={name}
            defaultValue={defaultValue}
          />
        )}
      </label>
      {errors && (
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {errors &&
            errors.map((error: string) => (
              <p className="w-[80%] mx-auto text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
