import { notFound } from "next/navigation";

// Services
import { getGpu } from "../../services/gpus";

// Utils
import calculatePerformance from "../../utils/calculatePerformance";
import getManufacturerColor from "../../utils/getManufacturerColor";

// CSS styles
import "../../styles/gpus.css";
import "../../styles/manufacturer-colors.css";

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

  // Helper functions
  function renderDivision(title: string) {
    return (
      <tr className="table-division-header">
        <th colSpan={2}>{title}</th>
      </tr>
    );
  }

  function renderRow(header: string, data: string | number) {
    return (
      <tr>
        <th className="row-label">{header}</th>
        <td className={`row-data ${gpuClass}`}>{String(data)}</td>
      </tr>
    );
  }

  return (
    <div>
      <table className="gpu-data-table">
        <thead>
          <tr>
            <th colSpan={2} className={gpuClass}>
              {gpu.manufacturer} {gpu.gpuline} {gpu.model}
            </th>
          </tr>
        </thead>
        <tbody>
          {renderDivision("Specifications")}
          {renderRow("Cores", gpu.cores)}
          {renderRow("TMUs", gpu.tmus)}
          {renderRow("ROPs", gpu.rops)}
          {renderRow("VRAM", `${vramToDisplay} ${gpu.memtype}`)}
          {renderRow("Bus Width", `${gpu.bus} bit`)}
          {renderDivision("Clock Speeds")}
          {renderRow("Base Clock", `${gpu.baseclock} MHz`)}
          {renderRow("Boost Clock", `${gpu.boostclock} MHz`)}
          {renderRow("Memory Clock", `${gpu.memclock} Gbps effective`)}
          {renderDivision("Theoretical Performance")}
          {renderRow("FP32(float)", performance[0])}
          {renderRow("Texture Rate", performance[1])}
          {renderRow("Pixel Rate", performance[2])}
          {renderRow("Bandwidth", performance[3])}
        </tbody>
      </table>
    </div>
  );
}
