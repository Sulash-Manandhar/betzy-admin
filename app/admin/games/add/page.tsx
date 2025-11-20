"use client";

import {
  Container,
  Layout,
  LayoutBreadCrumb,
  LayoutHeader,
} from "@/components/layouts";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useAppForm } from "@/components/ui/from";
import { useAuthToken } from "@/context/AuthTokenProvider";
import { useImageGallery } from "@/context/ImageGalleryProvider";
import { useCreateGame } from "@/hooks/queries/game";
import { createGameSchema } from "@/lib/schema";
import { CreateGameSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

const defaultValues: CreateGameSchema = {
  name: "",
  game_link: "",
  description: undefined,
  image_id: undefined,
};

export default function AddGame() {
  const { token } = useAuthToken();
  const router = useRouter();
  const { mutate } = useCreateGame(token);
  const { ImageSelector, selectedImage, clearSelectImage } = useImageGallery();

  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onBlur: createGameSchema,
      onChange: createGameSchema,
      onSubmit: createGameSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
      clearSelectImage();
      router.push("/admin/games");
    },
  });

  const setFormImageId = useEffectEvent((id?: number) => {
    form.setFieldValue("image_id", id);
  });

  useEffect(() => {
    setFormImageId(selectedImage?.id || undefined);
  }, [selectedImage]);

  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          { name: "Games", link: "/admin/games" },
          {
            name: "Add Game",
            link: "/admin/games/add",
            isCurrentPage: true,
          },
        ]}
      />
      <LayoutHeader
        title="Add Game"
        description="Add a new game to your collection."
      />
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField name="name">
              {(field) => <field.TextField label="Game Name" isRequired />}
            </form.AppField>
            <form.AppField name="game_link">
              {(field) => (
                <field.TextField label="Game link" type="url" isRequired />
              )}
            </form.AppField>
            <Field>
              <FieldLabel>
                Image <span className="text-red-400">*</span>
              </FieldLabel>
              {ImageSelector}
            </Field>
            <form.AppField name="description">
              {(field) => <field.TextField label="Description" />}
            </form.AppField>
            <form.AppForm>
              <form.SubscribeButton>Submit</form.SubscribeButton>
            </form.AppForm>
          </FieldGroup>
        </form>
      </Container>
    </Layout>
  );
}
