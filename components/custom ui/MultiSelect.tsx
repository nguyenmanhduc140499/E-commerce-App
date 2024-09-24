"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map(id =>
      collections.find(collection => collection._id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter(
    collection => !selected.includes(collection)
  );

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map(collection => (
          <Badge
            key={collection._id}
            className="hover:bg-grey-1 hover:text-white"
          >
            {collection.title}
            <button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Separator className="bg-grey-1" />
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandList>
            <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
              {selectables.length === 0 ? (
                <div>No result...</div>
              ) : (
                selectables.map(collection => (
                  <CommandItem
                    key={collection._id}
                    onMouseDown={e => e.preventDefault()}
                    onSelect={() => {
                      onChange(collection._id);
                      setInputValue("");
                    }}
                    className="hover:bg-grey-2 cursor-pointer"
                  >
                    {collection.title}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
