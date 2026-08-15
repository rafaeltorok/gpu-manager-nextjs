import type { GpuType } from "../types/gpu";

// Generate a slug name to be used on the URL
export function generateSlug(gpu: GpuType): string {
  return `${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function mapSlugs(gpus: GpuType[]): GpuType[] {
  return gpus.map((g) => {
    return {
      ...g,
      slug: generateSlug(g),
    };
  });
}
