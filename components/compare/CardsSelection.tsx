"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

// Utils
import { generateSlug } from "@/utils/slug";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface SelectionProps {
  gpus: GpuType[];
}

export default function Selection({ gpus }: SelectionProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSelection(formData: FormData) {
    const params = new URLSearchParams(searchParams);

    // Get both card names from the form
    const first = formData.get("first") as string;
    const second = formData.get("second") as string;

    // Set the params for the first card
    if (first) {
      const firstSlug = generateSlug(first);
      params.set("first", firstSlug);
    }

    // Set the params for the second card
    if (second) {
      const secondSlug = generateSlug(second);
      params.set("second", secondSlug);
    }

    // Add both cards names on the URL
    replace(`${pathname}?${params.toString()}`);
  }

  function getDefaultValue (slug: string | undefined) {
    const gpuFound = gpus.find((g) => slug === g.slug);
    
    if (!gpuFound) {
      return "NVIDIA GeForce RTX 3060";
    }
    return `${gpuFound.manufacturer} ${gpuFound.gpuline} ${gpuFound.model}`;
  }

  return (
    <form
      action={handleSelection}
      className="flex flex-col mx-auto align-left max-w-[300px] gap-5"
    >
      {renderSelectField("First card:", "first", gpus, getDefaultValue(searchParams.get("first")?.toString()))}
      {renderSelectField("Second card:", "second", gpus, getDefaultValue(searchParams.get("second")?.toString()))}

      <button
        type="submit"
        className="
          border-2 border-gray-600 rounded-xl
          p-2
          hover:bg-gray-700 active:bg-gray-700
        "
      >
        Confirm
      </button>
    </form>
  );
}

// Helper function
function renderSelectField(label: string, order: string, gpus: GpuType[], defaultValue: string) {
  return (
    <label>
      {label}
      <select
        name={order}
        defaultValue={defaultValue}
        className="ml-2"
      >
        {gpus.map((g) => (
          <option
            key={g.id}
            value={`${g.manufacturer} ${g.gpuline} ${g.model}`}
          >
            {g.manufacturer} {g.gpuline} {g.model}
          </option>
        ))}
      </select>
    </label>
  );
}
