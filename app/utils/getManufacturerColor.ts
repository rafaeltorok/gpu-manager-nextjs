import type { GpuType } from "../types/gpu";

export default function getManufacturerColor(gpu: GpuType): string {
  const fullModelName =
    `${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`.toLowerCase();

  if (fullModelName.includes("nvidia") || fullModelName.includes("geforce")) {
    return "nvidia-model";
  } else if (
    fullModelName.includes("amd") ||
    fullModelName.includes("radeon")
  ) {
    return "amd-model";
  } else if (fullModelName.includes("intel") || fullModelName.includes("arc")) {
    return "intel-model";
  }
  return "model";
}
