// Define the interface for each detail object

import { Input } from "@/components/ui/input";
import { Dispatch, FC, SetStateAction } from "react";

export interface Detail {
  [key: string]: string | number | boolean | undefined;
}

// Define props for the ClickToAddInputs component

interface ClickToAddInputsProps {
  details: Detail[]; // Array of detail objects
  setDetails: Dispatch<SetStateAction<Detail[]>>; // Setter function for details
  initialDetail?: Detail; // Optional initial detail object
  header: string; // Header text for the component
}

// ClickToAddInputs component definitions
const ClickToAddInputs: FC<ClickToAddInputsProps> = ({
  details,
  setDetails,
  header,
  initialDetail = {}, // Default value for initialDetail is an empty object
}) => {
  // PlusButton component for adding new details
  const PlusButton = ({ onClick }: { onClick: () => void }) => {
    return (
      <button
        type="button"
        title="Add new detail"
        className="group cursor-pointer outline-none hover:rotate-90 duration-300"
        onClick={onClick}
      >
        {/* Plus icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          className="w-8 h-8 stroke-blue-400 fill-none group-hover:fill-blue-primary group-active:stroke-blue-200 group-active:fill-blue-700 group-active:duration-0 duration-300"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            strokeWidth="1.5"
          />
          <path d="M8 12H16" strokeWidth="1.5" />
          <path d="M12 16V8" strokeWidth="1.5" />
        </svg>
      </button>
    );
  };

  // MinusButton component for removing details
  const MinusButton = ({ onClick }: { onClick: () => void }) => {
    return (
      <button
        type="button"
        title="Remove detail"
        className="group cursor-pointer outline-none hover:rotate-90 duration-300"
        onClick={onClick}
      >
        {/* Minus icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          className="w-8 h-8 stroke-blue-400 fill-none group-hover:fill-white group-active:stroke-blue-200 group-active:fill-blue-700 group-active:duration-0 duration-300"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            strokeWidth="1.5"
          />
          <path d="M8 12H16" strokeWidth="1.5" />
        </svg>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      {/* Header */}
      <div>{header}</div>
      {/* Display PlusButton if no details exist */}
      {details.length === 0 && <PlusButton onClick={() => {}} />}
      {/* Map through details and render input fields */}
      {details.map((detail, index) => (
        <div key={index} className="flex items-center gap-x-4">
          {Object.keys(detail).map((property, propIndex) => (
            <div key={propIndex} className="flex items-center gap-x-4">
              {/* Input field for each property */}
              <Input
                className="w-28"
                type={typeof detail[property] === "number" ? "number" : "text"}
                name={property}
                placeholder={property}
                value={detail[property] as string}
                min={typeof detail[property] === "number" ? 0 : undefined}
              />
            </div>
          ))}
          <MinusButton onClick={() => {}} />
          <PlusButton onClick={() => {}} />
        </div>
      ))}
    </div>
  );
};

export default ClickToAddInputs;
