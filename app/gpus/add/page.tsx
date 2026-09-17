import { createGpu } from "@/app/actions/gpus";

// Components
import AddForm from "@/components/add/AddForm";

// TypeScript types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add new | GPUs Manager",
};

// Server component
export default async function Page() {
  return (
    <div>
      <h2 className="text-center p-6 text-xl font-bold">
        Add new graphics card
      </h2>

      <AddForm createGpu={createGpu} />
    </div>
  );
}
