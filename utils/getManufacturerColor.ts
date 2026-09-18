export default function getManufacturerColor(fullModelName: string): string {
  const lowercaseModel = fullModelName.toLowerCase().trim();

  if (lowercaseModel.includes("nvidia") || lowercaseModel.includes("geforce")) {
    return "nvidia-model";
  } else if (
    lowercaseModel.includes("amd") ||
    lowercaseModel.includes("radeon")
  ) {
    return "amd-model";
  } else if (lowercaseModel.includes("intel") || lowercaseModel.includes("arc")) {
    return "intel-model";
  }
  return "model";
}
