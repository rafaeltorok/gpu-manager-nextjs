export default function getManufacturerColor(fullModelName: string): string {
  const lowercaseModel = fullModelName.toLowerCase().trim();

  // Prioritize the manufacturer name first
  if (lowercaseModel.includes("nvidia")) {
    return "nvidia-model";
  } else if (lowercaseModel.includes("amd")) {
    return "amd-model";
  } else if (lowercaseModel.includes("intel")) {
    return "intel-model";
  }

  // If the manufacturer is not one of the main ones, follow the line name
  if (lowercaseModel.includes("geforce")) {
    return "nvidia-model";
  } else if (lowercaseModel.includes("radeon")) {
    return "amd-model";
  } else if (lowercaseModel.includes("arc")) {
    return "intel-model";
  }

  // For generic manufacturers or lines, return a generic class name
  return "model";
}
