import { useRef, useEffect } from "react";

interface DialogMessageProps {
  message: string;
  showDialogMessage: boolean;
  setShowDialogMessage: (show: boolean) => void;
}

export default function DialogMessage({
  message,
  showDialogMessage,
  setShowDialogMessage,
}: DialogMessageProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showDialogMessage) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [showDialogMessage]);

  return (
    <div>
      <dialog
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
          top-1/2 -translate-y-1/2
        "
        onClose={() => setShowDialogMessage(false)}
      >
        <p
          className="
            text-xl
            font-bold-xl
            p-3
          "
        >
          {message}
        </p>
        <button
          type="button"
          onClick={() => setShowDialogMessage(false)}
        >
          Close
        </button>
      </dialog>
    </div>
  );
}
