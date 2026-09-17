// TypeScript types
import type { GpuType } from "../types/gpu";

// Helper function
function isValidData(data: unknown): boolean {
  return typeof data === "number" && Number.isFinite(data) && data > 0;
}

// Get Raw Performance util
export default function getRawPerformance(gpu: GpuType): number[] {
  return [
    getRawFp32(gpu.model, gpu.cores, gpu.boostclock),
    getRawTextureRate(gpu.tmus, gpu.boostclock),
    getRawPixelRate(gpu.rops, gpu.boostclock),
    getRawBandwidth(gpu.bus, gpu.memclock),
  ];
}

function getRawFp32(model: string, cores: number, coreclock: number): number {
  // Guard against invalid values
  if (model.trim() === "" || !isValidData(cores) || !isValidData(coreclock)) {
    return 0;
  }

  // Define the amount of IPC based on the graphics card model
  const factor =
    model.toLowerCase().includes("rx 7") ||
    model.toLowerCase().includes("rx 90")
      ? 4
      : 2;

  // Calculate the FP32 performance
  return (cores * coreclock * factor) / 1000000;
}

function getRawTextureRate(tmus: number, coreclock: number): number {
  // Guard against invalid values
  if (!isValidData(tmus) || !isValidData(coreclock)) {
    return 0;
  }

  return (tmus * coreclock) / 1000;
}

function getRawPixelRate(rops: number, coreclock: number): number {
  // Guard against invalid values
  if (!isValidData(rops) || !isValidData(coreclock)) {
    return 0;
  }

  return (rops * coreclock) / 1000;
}

function getRawBandwidth(bus: number, memclock: number): number {
  // Guard against invalid values
  if (!isValidData(bus) || !isValidData(memclock)) {
    return 0;
  }

  return (bus * memclock) / 8;
}
