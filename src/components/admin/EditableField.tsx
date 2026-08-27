"use client";

import { useRef } from "react";

export function EditableField({
  name,
  defaultValue,
  as = "input",
  className = "",
  placeholder,
}: {
  name: string;
  defaultValue: string;
  as?: "input" | "textarea";
  className?: string;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const base =
    "w-full resize-none rounded-sm border border-dashed border-transparent bg-transparent outline-none transition-colors hover:border-black/20 focus:border-black/40";

  if (as === "textarea") {
    return (
      <textarea
        ref={ref}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={defaultValue.split("\n").length || 2}
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = `${el.scrollHeight}px`;
        }}
        className={`${base} ${className}`}
      />
    );
  }

  return (
    <input
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`${base} ${className}`}
    />
  );
}
