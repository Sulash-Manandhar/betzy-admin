"use client";
import React, { InputHTMLAttributes } from "react";
import { useFieldContext } from ".";
import { Input } from "../input";
import { Field, FieldDescription, FieldLabel } from "../field";
import FieldError from "./FieldError";

type Props = {
  label: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  description?: string;
  isRequired?: boolean;
};

type InputTypeMap = {
  text: string;
  email: string;
  number: number;
  password: string;
  url: string;
};

type SupportedInputType = keyof InputTypeMap;

export default function TextField<T extends SupportedInputType = "text">({
  label,
  type = "text",
  description,
  isRequired,
}: Props) {
  const field = useFieldContext<InputTypeMap[T]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>
        {label} {isRequired && <span className="text-red-400">*</span>}
      </FieldLabel>
      <Input
        id={field.name}
        type={type}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => {
          const raw = e.target.value;
          const parsed =
            type === "number"
              ? (Number(raw) as InputTypeMap[T])
              : (raw as InputTypeMap[T]);
          field.handleChange(parsed);
        }}
        aria-invalid={isInvalid}
        placeholder="Juwa"
        autoComplete="off"
      />
      {!!description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError meta={field.state.meta} />}
    </Field>
  );
}
