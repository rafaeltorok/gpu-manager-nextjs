import { RefObject } from "react";

interface DialogMessageProps {
  messages: string[];
  ref: RefObject<HTMLDialogElement | null>;
}

export default function DialogMessage({
  messages,
  ref,
}: DialogMessageProps) {
  return (
    <dialog
      ref={ref}
      className="
        p-5
        bg-black
        text-white
        border-2 border-gray-600 rounded-xl
        mx-auto
        backdrop:bg-black/50
        backdrop:backdrop-blur-[3px]
        top-1/2 -translate-y-1/2
      "
      onClose={() => ref.current?.close()}
    >
      {/* Wrapper for the validation errors */}
      <div
        className="
          max-h-[200px]
          overflow-auto
        "
      >
        {messages.map((m: string) => (
          <p
            key={m}
            className="
              text-xl
              font-bold-xl
              py-1
            "
          >
            {m}
          </p>
        ))}
      </div>
      
      <button
        type="button"
        autoFocus
        className="
          w-full
          border-2 border-gray-600 rounded-xl
          p-2
          hover:bg-gray-700 active:bg-gray-700
          mx-auto mt-2
        "
        onClick={() => ref.current?.close()}
      >
        Close
      </button>
    </dialog>
  );
}
