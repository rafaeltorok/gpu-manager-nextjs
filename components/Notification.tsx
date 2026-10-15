import { useEffect, useRef } from "react";

interface NotificationProps {
  showMessage: boolean;
  message?: string;
}

export default function Notification({
  showMessage,
  message,
}: NotificationProps) {
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
      onCancel={(e) => e.preventDefault()} // stop Esc from closing it mid-load
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
    </dialog>
  );
}
