import type { GpuType } from "../types/gpu";

// Generate a slug name to be used on the URL
export function generateSlug(fullModelName: string): string {
  return fullModelName
    .toLowerCase()
    .replace(/\s+/g, "-")  // Convert all whitespaces to a dash
    .replace(/[^a-z0-9-]/, "");  // Remove any non-numerical or non-alphabetical symbols
}

// Add a slug field to each GPU type object
export function mapSlugs(gpus: GpuType[]): GpuType[] {
  return gpus.map((g) => {
    return {
      ...g,
      slug: generateSlug(`${g.manufacturer} ${g.gpuline} ${g.model}`),
    };
  });
}
