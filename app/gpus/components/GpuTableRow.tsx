"use client";

import { useState } from "react";

// CSS styles
import "../../gpus.css";

// TypeScript types
interface ComponentProps {
  header: string;
  data: string | number;
  gpuClass: string;
  editMode: boolean;
  originalValue: number;
  name: string;
}

// Client component
export default function GpuTableRow({
  header,
  data,
  gpuClass,
  editMode,
  originalValue,
  name,
}: ComponentProps) {
  const [value, setValue] = useState<number>(originalValue);

  return (
    <>
      {editMode ? (
        <tr>
          <th className="row-label">{header}</th>
          <td className={`row-data ${gpuClass}`}>
            <input
              className="data-table-edit-field"
              name={name}
              value={value}
              type="number"
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </td>
        </tr>
      ) : (
        <tr>
          <th className="row-label">{header}</th>
          <td className={`row-data ${gpuClass}`}>{String(data)}</td>
        </tr>
      )}
    </>
  );
}
