"use client";

import { useActionState } from "react";

// Actions
import { createGpu } from "@/app/actions/gpus";

// Components
import FormRow from "./FormRow";
import Notification from "../Notification";

// TypeScript types
import type { State } from "@/app/actions/gpus";

export default function AddForm() {
  // Handles the form validation messages
  const initialState: State = { message: null, errors: {} };

  // Handle submitting the form data
  const [state, formAction, isPending] = useActionState(
    createGpu,
    initialState,
  );

  return (
    <div>
      <form
        action={formAction}
        className="w-full max-w-[400px] mx-auto border-1 border-gray-700 p-3 rounded bg-black/50"
      >
        <FormRow
          label={"Manufacturer"}
          type={"text"}
          name={"manufacturer"}
          required={true}
          defaultValue={state?.values?.manufacturer}
          errors={state?.errors?.manufacturer}
          errorName={"manufacturer-error"}
        />
        <FormRow
          label={"Line"}
          type={"text"}
          name={"gpuline"}
          required={false}
          defaultValue={state?.values?.gpuline}
        />
        <FormRow
          label={"Model"}
          type={"text"}
          name={"model"}
          required={true}
          defaultValue={state?.values?.model}
          errors={state?.errors?.model}
          errorName={"model-error"}
        />
        <FormRow
          label={"Cores"}
          type={"number"}
          name={"cores"}
          required={true}
          defaultValue={state?.values?.cores}
          errors={state?.errors?.cores}
          errorName={"cores-error"}
        />
        <FormRow
          label={"TMUs"}
          type={"number"}
          name={"tmus"}
          required={true}
          defaultValue={state?.values?.tmus}
          errors={state?.errors?.tmus}
          errorName={"tmus-error"}
        />
        <FormRow
          label={"ROPs"}
          type={"number"}
          name={"rops"}
          required={true}
          defaultValue={state?.values?.rops}
          errors={state?.errors?.rops}
          errorName={"rops-error"}
        />
        <FormRow
          label={"VRAM (in GB)"}
          type={"number"}
          name={"vram"}
          required={true}
          defaultValue={state?.values?.vram}
          errors={state?.errors?.vram}
          errorName={"vram-error"}
          step={0.001}
        />
        <FormRow
          label={"Bus Width"}
          type={"number"}
          name={"bus"}
          required={true}
          defaultValue={state?.values?.bus}
          errors={state?.errors?.bus}
          errorName={"bus-error"}
        />
        <FormRow
          label={"Memory Type"}
          type={"text"}
          name={"memtype"}
          required={true}
          defaultValue={state?.values?.memtype}
          errors={state?.errors?.memtype}
          errorName={"memtype-error"}
        />
        <FormRow
          label={"Base Clock (in MHz)"}
          type={"number"}
          name={"baseclock"}
          required={true}
          defaultValue={state?.values?.baseclock}
          errors={state?.errors?.baseclock}
          errorName={"baseclock-error"}
        />
        <FormRow
          label={"Boost Clock (in MHz)"}
          type={"number"}
          name={"boostclock"}
          required={true}
          defaultValue={state?.values?.boostclock}
          errors={state?.errors?.boostclock}
          errorName={"boostclock-error"}
        />
        <FormRow
          label={"Memory Clock (in Gbps)"}
          type={"number"}
          name={"memclock"}
          required={true}
          defaultValue={state?.values?.memclock}
          errors={state?.errors?.memclock}
          errorName={"memclock-error"}
        />

        <button
          type="submit"
          className="
            w-full
            mt-1
            px-1 py-1
            bg-black/50 active:bg-gray-700 hover:bg-gray-900 disabled:bg-black
            disabled:text-gray-700
            font-bold
            border-1 border-gray-700 disabled:border-gray-900
            rounded
          "
        >
          Add
        </button>
      </form>

      {/* Display an UI message while the form action runs */}
      <Notification
        showMessage={isPending}
        message="Sending data, please wait..."
      />
    </div>
  );
}
