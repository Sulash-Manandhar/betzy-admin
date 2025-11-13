"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface FilterInputProps {
  placeholder?: string;
  onFilter: (value: string) => void;
  debounceMs?: number;
}

export function FilterInput({
  placeholder = "Filter...",
  onFilter,
  debounceMs = 300,
}: FilterInputProps) {
  const [value, setValue] = useState("");
  const timeoutRef = React.useRef<NodeJS.Timeout>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onFilter(newValue);
    }, debounceMs);
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="h-10 max-w-xs"
    />
  );
}
