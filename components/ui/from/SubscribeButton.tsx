"use client";

import { useStore } from "@tanstack/react-form";
import { useFormContext } from ".";
import { Button } from "../button";
import { PropsWithChildren } from "react";
import { Field } from "../field";

export default function SubscribeButton({ children }: PropsWithChildren) {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);
  return (
    <Field>
      <Button type="submit" disabled={isSubmitting || !canSubmit}>
        {children}
      </Button>
    </Field>
  );
}
