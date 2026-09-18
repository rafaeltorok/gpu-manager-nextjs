export interface GpuType {
  id: string;
  manufacturer: string;
  gpuline: string;
  model: string;
  cores: number;
  tmus: number;
  rops: number;
  vram: number;
  bus: number;
  memtype: string;
  baseclock: number;
  boostclock: number;
  memclock: number;
  slug?: string;
}

export interface NewGpu {
  manufacturer: string;
  gpuline?: string;
  model: string;
  cores: number;
  tmus: number;
  rops: number;
  vram: number;
  bus: number;
  memtype: string;
  baseclock: number;
  boostclock: number;
  memclock: number;
}
export interface MappedModel {
  slug: string;
  model: string;
}
