// Components
import Division from "@/components/gpu/TableRows/Division";

// TypeScript types
interface ControlsProps {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  handleClocksReset: () => void;
}

export default function Controls({
  editMode,
  setEditMode,
  handleClocksReset,
}: ControlsProps) {
  return (
    <>
      <Division title="Override Clock Speeds" />
      <div className="flex">
        {editMode ? (
          <>
            {/* Since the buttons sit in the same position in the tree, */}
            {/* React sees "same element type, same position" and reuses the same DOM node */}
            {/* To prevent the edit mode immediately leaving, set a "key" for each button */}
            <button
              key="confirm"
              type="submit"
              className="
                w-1/2
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
            >
              Confirm
            </button>
            <button
              key="cancel"
              type="button"
              className="
                w-1/2
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              key="edit"
              type="button"
              className="
                w-1/2
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
              onClick={() => setEditMode(true)}
            >
              Override
            </button>
            <button
              key="reset"
              type="button"
              className="
                w-1/2
                px-1 py-1
                bg-black/50
                border-1 border-gray-700
                hover:bg-gray-800 active:bg-gray-800
                rounded-xl
              "
              onClick={() => handleClocksReset()}
            >
              Reset
            </button>
          </>
        )}
      </div>
    </>
  );
}
