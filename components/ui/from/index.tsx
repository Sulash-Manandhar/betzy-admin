"use client";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import dynamic from "next/dynamic";

const TextField = dynamic(() => import("./TextField"));
const SubscribeButton = dynamic(() => import("./SubscribeButton"));

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  fieldContext,
  formContext,
  formComponents: {
    SubscribeButton,
  },
});
