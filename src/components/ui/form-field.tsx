import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  label?: string;
  name?: string;
  type?: string;
  defaultValue?: string;
  readOnly?: boolean;
  required?: boolean;
  error?: string[];
  onlyError?: boolean;
};

export function FormField({
  label,
  name,
  type = "text",
  defaultValue,
  readOnly,
  required = true,
  error,
  onlyError = false,
}: FormFieldProps) {
  if (onlyError) {
    return <p className="text-red-600 text-sm">{error?.at(0) || "\u00A0"}</p>;
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        readOnly={readOnly}
      />
      <p className="text-red-600 text-sm">{error?.at(0) || "\u00A0"}</p>
    </div>
  );
}
