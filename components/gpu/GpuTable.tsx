"use client";

import { useRouter } from "next/navigation";

// Server actions
import { deleteGpu, editGpu } from "@/app/actions/gpus";

// React
import { useState, useEffect, useActionState, useRef } from "react";
import { useSwipeable } from "react-swipeable";

// Utils
import calculatePerformance from "@/utils/calculatePerformance";

// Components
import Title from "./TableSections/Title";
import Specifications from "./TableSections/Specifications";
import ClockSpeeds from "./TableSections/ClockSpeeds";
import Performance from "./TableSections/Performance";
import Controls from "./TableSections/Controls";
import ConfirmMessage from "./ConfirmMessage";
import NavArrows from "./NavArrows";
import Notification from "../Notification";
import DialogMessage from "./DialogMessage";

// TypeScript types
import type { GpuType } from "../../types/gpu";
import type { SwipeEventData } from "react-swipeable";
import type { State } from "@/app/actions/gpus";

interface ComponentProps {
  gpu: GpuType;
  gpuClass: string;
  previous: GpuType | null;
  next: GpuType | null;
}

// Client component
export default function GpuTable({
  gpu,
  gpuClass,
  previous,
  next,
}: ComponentProps) {
  // Define the table modes
  const [editMode, setEditMode] = useState(false);
  const [overrideMode, setOverrideMode] = useState(false);

  // Handle displaying the remove graphics card confirmation message
  const [openModal, setOpenModal] = useState(false);

  // Handle displaying validation errors during edit mode
  const [messages, setMessages] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Create a copy of the original GPU data to modify it
  const [gpuData, setGpuData] = useState(gpu);

  // Handle the update validation messages
  const initialState: State = { message: null, errors: {} };

  // Handle updating the graphics card data
  const [state, formAction, isPending] = useActionState(
    editGpu,
    initialState,
  );

  const router = useRouter();

  // Get the theoretical performance for the current graphics card
  const performance = calculatePerformance(gpuData);

  // Sync the data of the copy after a successful database update
  useEffect(() => {
    async function handleUpdate() {
      setGpuData(gpu);
      setEditMode(false);
    }
    handleUpdate();
  }, [gpu]);

  // Handles keyboard navigation
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Left arrow key
      if (event.key === "ArrowLeft" && previous && !openModal) {
        router.push(`/gpus/${previous.slug}`);
      }

      // Right arrow key
      if (event.key === "ArrowRight" && next && !openModal) {
        router.push(`/gpus/${next.slug}`);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previous, next, router, openModal]);

  // Handles displaying validation errors on the dialog component
  useEffect(() => {
    const fieldErrors = (Object.values(state?.errors ?? { error: "Error updating data" }) as string[][]).flat();

    const list =
      fieldErrors.length > 0 ? fieldErrors : state?.message ? [state.message] : [];

    // During the initial state (or no messages): do nothing
    if (list.length === 0) return;

    // Sets the list of messages to be displayed by the dialog element
    function handleMessages() {
      setMessages(list);
    }
    handleMessages();

    // Display the HTML <dialog> element
    dialogRef.current?.showModal();
  }, [state, dialogRef]);

  // Handles the Touch screen swipe to change the page
  const swipeHandler = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      // Previous page
      if (eventData.dir === "Right" && previous && !openModal) {
        router.push(`/gpus/${previous.slug}`);
      }

      // Next page
      if (eventData.dir === "Left" && next && !openModal) {
        router.push(`/gpus/${next.slug}`);
      }
    },
    delta: 50, // Define the min amount of pixels before a swipe is registered
  });

  // Handle removing a graphics card from the list
  async function handleDelete(id: string) {
    try {
      await deleteGpu(id);
      router.push("/gpus");
    } catch (err: unknown) {
      console.error(err);
      window.alert("Failed to remove the graphics card");
    }
  }

  return (
    <div>
      <form
        className="
          w-full
          min-w-[300px] max-w-[400px] lg:max-w-[900px] md:max-w-[700px] sm:max-w-[600px]
          border-5 border-gray-700
          mx-auto mt-6
          rounded-xl
          wrap-break-word
          relative
        "
        action={formAction}
        {...swipeHandler}
      >
        {/* Provides the ID to the action responsible for updating the specs */}
        <input type="hidden" name="id" value={gpu.id} />

        {/* Full model name on the top of the table */}
        <Title
          gpuData={gpuData}
          setGpuData={setGpuData}
          editMode={editMode}
          gpuClass={gpuClass}
        />

        {/* Navigation arrows */}
        <NavArrows previous={previous?.slug || ""} next={next?.slug || ""} />

        {/* Wrapper for the data section of the table */}
        <div className="sm:grid sm:grid-cols-3 lg:h-[250px] sm:h-[300px]">
          {/* Wrapper for the Specifications section */}
          <Specifications
            gpuData={gpuData}
            setGpuData={setGpuData}
            editMode={editMode}
            gpuClass={gpuClass}
          />

          {/* Wrapper for the Clock speeds section */}
          <ClockSpeeds
            gpuData={gpuData}
            setGpuData={setGpuData}
            editMode={editMode}
            overrideMode={overrideMode}
            gpuClass={gpuClass}
          />

          {/* Wrapper for the Performance section */}
          <Performance performance={performance} gpuClass={gpuClass} />
        </div>

        {/* Wrapper for the table controls */}
        <Controls
          gpu={gpu}
          setGpuData={setGpuData}
          editMode={editMode}
          setEditMode={setEditMode}
          overrideMode={overrideMode}
          setOverrideMode={setOverrideMode}
          setOpenModal={setOpenModal}
        />
      </form>

      {/* Show message to confirm a graphics card removal */}
      <ConfirmMessage
        id={gpu.id}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDelete={handleDelete}
        fullModelName={`${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`}
        gpuClass={gpuClass}
      />

      {/* Displays validation errors, if necessary */}
      <DialogMessage
        messages={messages}
        ref={dialogRef}
      />

      {/* Display an UI message while the update action runs */}
      <Notification
        showMessage={isPending}
        message="Updating graphics card data..."
      />
    </div>
  );
}
