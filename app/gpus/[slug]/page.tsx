import { notFound } from "next/navigation";

// Services
import { getGpu } from "../../services/gpus";

// Utils
import getManufacturerColor from "../../utils/getManufacturerColor";

// Components
import GpuTable from "../components/GpuTable";

// CSS styles
import "../../gpus.css";
import "../../manufacturer-colors.css";

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

        <table className="gpu-data-table">
          <thead>
            <tr>
              <th colSpan={2} className={gpuClass}>
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
