import { type Control, useController } from "react-hook-form";
import { useRef, useState } from "react";
import { Icon } from "@/assets/icon/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FieldBrandImageProps {
  control: Control<any>;
  name: string;
  currentImage?: string;
}

export default function FieldBrandImage({
  control,
  name,
  currentImage,
}: FieldBrandImageProps) {
  const { field } = useController({ name, control });
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Put the File object into the RHF field value
    // brands.api.ts checks: image instanceof File → sends FormData
    field.onChange(file);

    // Show a local preview without any upload
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    field.onChange(undefined);
    setPreview(currentImage || null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const hasNewFile = field.value instanceof File;

  return (
    <section className="grid grid-cols-4 gap-2 items-center">
      {/* Image Preview */}
      <div className="bg-muted relative size-20 overflow-hidden rounded-md border">
        {preview ? (
          <img
            src={preview}
            alt="Brand preview"
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Icon.CameraIcon className="text-muted-foreground size-8" />
          </div>
        )}
      </div>

      {/* File Input */}
      <InputGroup className="col-span-3 self-end">
        <InputGroupInput
          ref={inputRef}
          id={name}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <InputGroupAddon align="inline-end">
          {/* Trigger file picker */}
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            <Icon.PlusIcon />
          </InputGroupButton>

          {/* Clear selection (only shown when a new file is chosen) */}
          {hasNewFile && (
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              type="button"
              onClick={handleClear}
            >
              <Icon.XIcon />
            </InputGroupButton>
          )}
        </InputGroupAddon>
      </InputGroup>
    </section>
  );
}
