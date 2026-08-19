import { notFound } from "next/navigation";

// Services
import { getGpu } from "../../services/gpus";
import { deleteGpu } from "@/app/actions/gpus";

// Utils
import calculatePerformance from "../../utils/calculatePerformance";
import getManufacturerColor from "../../utils/getManufacturerColor";

// Components
import GpuTableRow from "@/app/gpus/components/GpuTableRow";
import GpuTableDivision from "@/app/gpus/components/GpuTableDivision";

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

  // Get the theoretical performance for a card
  const performance = calculatePerformance(gpu);

  // Format the VRAM suffix in either MB or GB
  const vramToDisplay = gpu.vram < 1 ? `${gpu.vram * 1000}MB` : `${gpu.vram}GB`;

  return (
    <div>
      <form action={deleteGpu}>
        <input type="hidden" name="id" value={gpu.id} />

        <table className="gpu-data-table">
          <thead>
            <tr>
              <th colSpan={2} className={gpuClass}>
                {gpu.manufacturer} {gpu.gpuline} {gpu.model}
              </th>
            </tr>
          </thead>
          <tbody>
            <GpuTableDivision title="Specifications" />
            <GpuTableRow header="Cores" data={gpu.cores} gpuClass={gpuClass} />
            <GpuTableRow header="TMUs" data={gpu.tmus} gpuClass={gpuClass} />
            <GpuTableRow header="ROPs" data={gpu.rops} gpuClass={gpuClass} />
            <GpuTableRow
              header="VRAM"
              data={`${vramToDisplay} ${gpu.memtype}`}
              gpuClass={gpuClass}
            />
            <GpuTableRow
              header="Bus Width"
              data={`${gpu.bus} bit`}
              gpuClass={gpuClass}
            />

            <GpuTableDivision title="Clock Speeds" />
            <GpuTableRow
              header="Base Clock"
              data={`${gpu.baseclock} MHz`}
              gpuClass={gpuClass}
            />
            <GpuTableRow
              header="Boost Clock"
              data={`${gpu.boostclock} MHz`}
              gpuClass={gpuClass}
            />
            <GpuTableRow
              header="Memory Clock"
              data={`${gpu.memclock} Gbps effective`}
              gpuClass={gpuClass}
            />

            <GpuTableDivision title="Theoretical Performance" />
            <GpuTableRow
              header="FP32(float)"
              data={performance[0]}
              gpuClass={gpuClass}
            />
            <GpuTableRow
              header="Texture Rate"
              data={performance[1]}
              gpuClass={gpuClass}
            />
            <GpuTableRow
              header="Pixel Rate"
              data={performance[2]}
              gpuClass={gpuClass}
            />
            <GpuTableRow
              header="Bandwidth"
              data={performance[3]}
              gpuClass={gpuClass}
            />

            <tr>
              <th colSpan={2}>
                <button type="submit">Remove</button>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
