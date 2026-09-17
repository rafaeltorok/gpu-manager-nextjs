// Server actions
import { editGpu } from "@/app/actions/gpus";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface ControlsProps {
  gpu: GpuType;
  setGpuData: (data: GpuType) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  calculateMode: boolean;
  setCalculateMode: (mode: boolean) => void;
  setOpenModal: (open: boolean) => void;
}

export default function Controls({
  gpu,
  setGpuData,
  editMode,
  setEditMode,
  calculateMode,
  setCalculateMode,
  setOpenModal,
}: ControlsProps) {
  return (
    <div
      className="
      flex flex-col
      sm:flex-row
      w-full
      my-1
      font-bold
      gap-1"
    >
      {/* Calculate mode */}
      {!editMode && (
        <>
          {calculateMode ? (
            <button
              className="
                w-full
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
              type="submit"
              formAction={() => {
                setCalculateMode(false);
              }}
            >
              Confirm
            </button>
          ) : (
            <button
              className="
                w-full
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
              type="submit"
              formAction={() => setCalculateMode(true)}
            >
              Calculate performance
            </button>
          )}
        </>
      )}

      {/* Edit mode */}
      {!calculateMode && (
        <>
          {editMode ? (
            <button
              className="
                w-full
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
              type="submit"
              formAction={async (formData) => {
                setEditMode(false);
                await editGpu(formData);
              }}
            >
              Save
            </button>
          ) : (
            <button
              className="
                w-full
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
              type="submit"
              formAction={() => setEditMode(true)}
            >
              Edit
            </button>
          )}
        </>
      )}

      {/* When using any table modes, show the "Cancel" button instead of the "Remove" one */}
      {editMode || calculateMode ? (
        <button
          className="
            w-full
            px-1 py-1
            bg-black/50
            border-1 border-gray-700
            hover:bg-gray-800 active:bg-gray-800
            rounded-xl
          "
          type="submit"
          formAction={() => {
            setEditMode(false);
            setCalculateMode(false);
            setGpuData(gpu);
          }}
        >
          Cancel
        </button>
      ) : (
        <button
          className="
            w-full
            px-1 py-1
            bg-black/50
            border-1 border-gray-700
            hover:bg-gray-800 active:bg-gray-800
            rounded-xl
          "
          type="button"
          onClick={() => setOpenModal(true)}
        >
          Remove
        </button>
      )}
    </div>
  );
}
