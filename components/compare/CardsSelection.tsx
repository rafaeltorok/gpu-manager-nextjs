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

  function getDefaultValue(slug: string | undefined) {
    const gpuFound = gpus.find((g) => slug === g.slug);
    return gpuFound?.slug || "";
  }

  return (
    <form
      action={handleSelection}
      className="
        flex flex-col
        mx-auto mb-10
        align-left
        max-w-[400px]
        min-w-[300px]
        gap-5
        bg-black/50
        border-2 border-gray-700 rounded
        p-5
      "
    >
      {renderSelectField(
        "First card:",
        "first",
        gpus,
        getDefaultValue(searchParams.get("first")?.toString()),
      )}
      {renderSelectField(
        "Second card:",
        "second",
        gpus,
        getDefaultValue(searchParams.get("second")?.toString()),
      )}

      <button
        type="submit"
        className="
          border-2 border-gray-600 rounded-xl
          p-2
          bg-black/50 hover:bg-gray-700 active:bg-gray-700
        "
      >
        Confirm
      </button>
    </form>
  );
}

// Helper function
function renderSelectField(
  label: string,
  order: string,
  gpus: GpuType[],
  defaultValue: string,
) {
  return (
    <label>
      {label}
      <select
        key={defaultValue}
        name={order}
        defaultValue={defaultValue}
        className="ml-2 bg-black p-1 w-full"
      >
        {gpus.map((g) => (
          <option key={g.id} value={g.slug}>
            {g.manufacturer} {g.gpuline} {g.model}
          </option>
        ))}
      </select>
    </label>
  );
}
