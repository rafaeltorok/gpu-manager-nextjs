import { notFound } from "next/navigation";

// Services
import { getGpu } from "@/services/gpus";

// Utils
import getManufacturerColor from "@/utils/getManufacturerColor";

// Components
import GpuTable from "@/components/GpuTable";

// Server component
export default async function Gpu({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Fetch the GPU from the database
  const { slug } = await params;
  const gpu = await getGpu(slug);

  // Handle invalid urls
  if (!gpu) notFound();

  // Add the manufacturer color scheme to the data table
  const gpuClass = getManufacturerColor(gpu);

  return (
    <div>
      <form>
        <input type="hidden" name="id" value={gpu.id} />

        <table className="w-full min-w-[300px] max-w-[400px] border-2 border-gray-700 mx-auto my-6 border-collapse">
          <thead>
            <tr>
              <th
                colSpan={2}
                className={`bg-black p-5 text-2xl font-extrabold ${gpuClass}`}
              >
                {gpu.manufacturer} {gpu.gpuline} {gpu.model}
              </th>
            </tr>
          </thead>

          <GpuTable gpu={gpu} gpuClass={gpuClass} />
        </table>
      </form>
    </div>
  );
}
