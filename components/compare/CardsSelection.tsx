"use client";

import { useState, useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// Components
import SelectField from "./selection/SelectField";
import Notification from "../Notification";

// TypeScript types
import type { GpuType, MappedModel } from "@/types/gpu";

interface SelectionProps {
  gpus: GpuType[];
}

export default function Selection({ gpus }: SelectionProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Handle displaying a notification message while the comparison is loading
  const [isPending, startTransition] = useTransition();

  // Makes React control the value for the Combobox.Root element
  const [firstSelection, setFirstSelection] = useState(
    searchParams.get("first")?.toString() || "",
  );
  const [secondSelection, setSecondSelection] = useState(
    searchParams.get("second")?.toString() || "",
  );

  // Handle the cards selection after clicking on the "Confirm" button
  function handleSelection(formData: FormData) {
    const params = new URLSearchParams(searchParams);

    // Extract the slug values from the form
    const first = formData.get("first") as string;
    const second = formData.get("second") as string;

    // Set the params for the first card
    if (first) {
      params.set("first", first);
      setFirstSelection(first);
    }

    // Set the params for the second card
    if (second) {
      params.set("second", second);
      setSecondSelection(second);
    }

    // Add the slug values into the URL params
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  // Generate an array containing only the slug value and full model name
  // of each card, for the select list presentation only
  const mappedModelNames: MappedModel[] = gpus.map((g) => ({
    slug: g.slug || "",
    model: `${g.manufacturer} ${g.gpuline} ${g.model}` || "",
  }));

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
        selectOption={firstSelection}
        setSelection={setFirstSelection}
      />
      <SelectField
        mappedModelNames={mappedModelNames}
        order="second"
        label="Second card:"
        selectOption={secondSelection}
        setSelection={setSecondSelection}
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

      <Notification
        showMessage={isPending}
        message="Loading comparison, please wait..."
      />
    </form>
  );
}
