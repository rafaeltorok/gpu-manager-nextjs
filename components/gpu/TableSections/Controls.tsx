// TypeScript types
import type { GpuType } from "@/types/gpu";

interface ControlsProps {
  gpu: GpuType;
  setGpuData: (data: GpuType) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  overrideMode: boolean;
  setOverrideMode: (mode: boolean) => void;
  setOpenModal: (open: boolean) => void;
}

export default function Controls({
  gpu,
  setGpuData,
  editMode,
  setEditMode,
  overrideMode,
  setOverrideMode,
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
      {/* Override mode - Allows temporarily modifying the clock speeds */}
      {!editMode && (
        <button
          key="override-button"
          className="
            w-full
            px-1 py-1
            bg-black/50
            border-1 border-gray-700
            hover:bg-gray-800 active:bg-gray-800
            rounded-xl
          "
          type="button"
          onClick={() => {
            if (overrideMode) {
              setOverrideMode(false);
            } else {
              setOverrideMode(true);
            }
          }}
        >
          {overrideMode ? "Confirm" : "Override Clock"}
        </button>
      )}

      {/* Edit mode - Alter the database data for an existing graphics card */}
      {!overrideMode && (
        <>
          {editMode ? (
            <button
              key="save-button"
              className="
                w-full
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
              type="submit"
            >
              Save
            </button>
          ) : (
            <button
              key="edit-button"
              className="
                w-full
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
              type="button"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}
        </>
      )}

      {/* Using any table modes, display the "Cancel" button instead of "Remove" */}
      {editMode || overrideMode ? (
        <button
          key="reset-cancel-button"
          className="
            w-full
            px-1 py-1
            bg-black/50
            border-1 border-gray-700
            hover:bg-gray-800 active:bg-gray-800
            rounded-xl
          "
          type="button"
          onClick={() => {
            setEditMode(false);
            setOverrideMode(false);
            setGpuData(gpu);
          }}
        >
          {overrideMode ? "Reset" : "Cancel"}
        </button>
      ) : (
        <button
          key="remove-button"
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
