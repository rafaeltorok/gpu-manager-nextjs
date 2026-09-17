import { useEffect, useRef } from "react";

interface SendingDataMessageProps {
  showMessage: boolean;
}

export default function SendingDataMessage({
  showMessage,
}: SendingDataMessageProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showMessage) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [showMessage]);

  return (
    <dialog
      ref={ref}
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
        "
      >
        Sending data, please wait...
      </p>
    </dialog>
  );
}
