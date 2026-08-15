import { createGpu } from "@/app/actions/gpus";

// CSS styles
import "../../addform.css";

// Render each row of the form
function renderRow(
  label: string,
  type: string,
  name: string,
  required: boolean,
) {
  return (
    <div className="add-gpu-form-row">
      <label>{label}</label>
      {required ? (
        <input type={type} name={name} required />
      ) : (
        <input type={type} name={name} />
      )}
    </div>
  );
}

// Server component
export default async function AddGpu() {
  return (
    <div>
      <h2>Add new graphics card</h2>

      <form action={createGpu} className="add-gpu-form">
        {renderRow("Manufacturer", "text", "manufacturer", true)}
        {renderRow("Line", "text", "gpuline", false)}
        {renderRow("Model", "text", "model", true)}
        {renderRow("Cores", "number", "cores", true)}
        {renderRow("TMUs", "number", "tmus", true)}
        {renderRow("ROPs", "number", "rops", true)}
        {renderRow("VRAM (in GB)", "number", "vram", true)}
        {renderRow("Bus Width", "number", "bus", true)}
        {renderRow("Memory Type", "text", "memtype", true)}
        {renderRow("Base Clock (in MHz)", "number", "baseclock", true)}
        {renderRow("Boost Clock (in MHz)", "number", "boostclock", true)}
        {renderRow("Memory Clock (in Gbps)", "number", "memclock", true)}

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
