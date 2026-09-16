import { useEffect, useRef } from "react";

interface ConfirmMessageProps {
  id: string;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  handleDelete: (id: string) => void;
  fullModelName: string;
  gpuClass: string;
}

export default function ConfirmMessage({
  id,
  openModal,
  setOpenModal,
  handleDelete,
  fullModelName,
  gpuClass,
}: ConfirmMessageProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <div>
      <dialog
        ref={ref}
        onCancel={() => setOpenModal(false)}
        className="
          justify-center
          align-center
          p-5
          bg-black
          text-white
          border-2 border-gray-600 rounded-xl
          mx-auto
          my-auto sm:my-5
          backdrop:bg-black/50
          backdrop:backdrop-blur-[3px]
        "
      >
        <p
          className="
            text-xl
            font-bold-xl
            p-3
            mb-5
          "
        >
          Remove <q className={`${gpuClass}`}>{fullModelName}</q> from the list?
        </p>

        <div className="flex flex-col sm:flex-row">
          <button
            type="button"
            className="
              sm:w-1/2
              border-2 border-gray-600 rounded-xl
              p-2
              hover:bg-gray-700 active:bg-gray-700
            "
            onClick={() => {
              setOpenModal(false);
              handleDelete(id);
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            autoFocus
            className="
              sm:w-1/2
              border-2 border-gray-600 rounded-xl
              p-2
              hover:bg-gray-700 active:bg-gray-700
            "
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
}
