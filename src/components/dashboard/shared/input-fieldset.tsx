import { FormLabel } from "@/components/ui/form";
import { Dot } from "lucide-react";
import { ReactNode } from "react";

export default function InputFieldset({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <fieldset className="border rounded-md p-4">
        <legend className="px-2">
          <FormLabel>{label}</FormLabel>
        </legend>
        {description && (
          <p className="text-sm text-main-secondary dark:text-gray-400 pb-3 flex">
            <Dot className="-me-1" />
            {description}
          </p>
        )}
        {children}
      </fieldset>
    </div>
  );
}
