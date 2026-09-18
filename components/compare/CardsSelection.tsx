"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

// Components
import SelectField from "./selection/SelectField";

// TypeScript types
import type { GpuType, MappedModel } from "@/types/gpu";

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
      params.set("first", first);
    }

    // Set the params for the second card
    if (second) {
      params.set("second", second);
    }

    // Add both cards names on the URL
    replace(`${pathname}?${params.toString()}`);
  }

  // Map only the slugs and full model names for the select list presentation
  const mappedModelNames: MappedModel[] = gpus.map((g) => ({
    slug: g.slug || "",
    model: `${g.manufacturer} ${g.gpuline} ${g.model}` || "",
  }));

  // Get the respective mapped model based on the URL parameters
  function getDefaultValue(order: string): string {
    const found = mappedModelNames.find(
      (m) => m.slug === searchParams.get(order)?.toString(),
    );
    return found?.slug || "";
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
      <SelectField
        mappedModelNames={mappedModelNames}
        order="first"
        label="First card:"
        value={getDefaultValue("first")}
      />
      <SelectField
        mappedModelNames={mappedModelNames}
        order="second"
        label="Second card:"
        value={getDefaultValue("second")}
      />

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
