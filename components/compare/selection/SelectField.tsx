import { Combobox } from "@base-ui/react/combobox";

// Utils
import getManufacturerColor from "@/utils/getManufacturerColor";

// Components
import CheckIcon from "./CheckIcon";
import CaretDownIcon from "./CaretDownIcon";

// TypeScript types
import type { MappedModel } from "@/types/gpu";

interface SelectFieldProps {
  mappedModelNames: MappedModel[];
  order: string;
  label: string;
  value: string;
}

export default function SelectField({
  mappedModelNames,
  order,
  label,
  value,
}: SelectFieldProps) {
  const items = Combobox.createItems(mappedModelNames, {
    getValue: (item) => item.slug,
    getLabel: (item) => item.model,
  });

  return (
    <Combobox.Root items={items} name={order} defaultValue={value}>
      <label htmlFor={`${order}-search`}>
        {label}
        <Combobox.InputGroup className="flex w-full border-2 border-gray-700 rounded p-1">
          <Combobox.Input
            id={`${order}-search`}
            type="search"
            placeholder="Filter by model name"
            className="w-9/10 p-1"
          />
          <div className="flex w-1/10 align-center">
            <Combobox.Trigger aria-label="Open popup" className="w-full">
              <CaretDownIcon />
            </Combobox.Trigger>
          </div>
        </Combobox.InputGroup>

        <Combobox.Portal className="w-full">
          <Combobox.Positioner>
            <Combobox.Popup>
              <Combobox.Empty>
                <span className="bg-black/75 pb-2 px-2">
                  No graphics cards were found
                </span>
              </Combobox.Empty>
              <Combobox.List
                className="
                  bg-black/25
                  border-1 border-gray-500
                  overflow-auto
                  max-h-[300px]
                "
              >
                {(g: MappedModel) => (
                  <Combobox.Item
                    key={g.slug}
                    value={g.slug}
                    className={`
                      odd:bg-black/75 even:bg-gray-800/80
                      p-2
                      hover:bg-gray-700 hover:underline
                      active:bg-gray-700 active:underline
                      ${getManufacturerColor(g.model)}
                    `}
                  >
                    <div className="flex">
                      <span>{g.model}</span>
                      <Combobox.ItemIndicator>
                        <CheckIcon className="ml-2 text-white" />
                      </Combobox.ItemIndicator>
                    </div>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </label>
    </Combobox.Root>
  );
}
