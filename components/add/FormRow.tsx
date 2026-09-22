interface FormRowProps {
  label: string;
  type: string;
  name: string;
  required: boolean;
  defaultValue?: string;
  errors?: string[] | undefined;
  errorName?: string;
  step?: number;
}

export default function FormRow({
  label,
  type,
  name,
  required,
  defaultValue,
  errors,
  errorName,
  step,
}: FormRowProps) {
  return (
    <div className="mb-1">
      <label
        className="flex flex-col w-full space-y-1 font-bold"
        htmlFor={name}
      >
        <span className="w-[90%] mx-auto mb-0">{label}</span>
        <input
          className={`w-[80%] mx-auto bg-black mb-1 p-0.5 border-1 border-gray-700 ${errors && "border-red-500"}`}
          id={name}
          type={type}
          name={name}
          required={required}
          aria-describedby={`${errorName}`}
          defaultValue={defaultValue}
          step={step}
        />
      </label>
      {errors && (
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {errors &&
            errors.map((error: string) => (
              <p className="w-[80%] mx-auto text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
