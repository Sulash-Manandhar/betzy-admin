"use client";
import {
  Container,
  Layout,
  LayoutBreadCrumb,
  LayoutHeader,
} from "@/components/layouts";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useAppForm } from "@/components/ui/from";
import { useImageGallery } from "@/context/ImageGalleryProvider";
import { useFindGame, useUpdateGame } from "@/hooks/queries/game";
import { createGameSchema } from "@/lib/schema";
import { CreateGameSchema, Game } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

const defaultValues: CreateGameSchema = {
  name: "",
  game_link: "",
  description: undefined,
  image_id: undefined,
};

export default function EditGame() {
  const params = useParams<{ id: string }>();
  const id = params.id.toString();
  const router = useRouter();

  const { data, isLoading, isError } = useFindGame(id);
  const { mutate } = useUpdateGame();
  const { ImageSelector, selectedImage, clearSelectImage, setDefaultImage } =
    useImageGallery();

  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onBlur: createGameSchema,
      onChange: createGameSchema,
      onSubmit: createGameSchema,
    },
    onSubmit: ({ value }) => {
      if (!data?.id) return;
      mutate(
        { id: data.id.toString(), data: value },
        {
          onSuccess: () => {
            clearSelectImage();
            router.push("/admin/games");
          },
        }
      );
    },
  });

  const setFormImageId = useEffectEvent((id?: number) => {
    form.setFieldValue("image_id", id);
  });

  useEffect(() => {
    setFormImageId(selectedImage?.id || undefined);
  }, [selectedImage]);

  const populateDefaultFormData = useEffectEvent((data: Game | undefined) => {
    if (isLoading || !data) return;
    form.setFieldValue("name", data.name);
    form.setFieldValue("game_link", data.game_link);
    form.setFieldValue("image_id", data.image_id);
    form.setFieldValue("description", data.description || undefined);
    if (data.image) {
      setDefaultImage(data.image);
    }
  });

  useEffect(() => {
    populateDefaultFormData(data);
  }, [data]);

  if (!data && isError) {
    return <div>Error could not load data</div>;
  }

  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          { name: "Games", href: "/admin/games" },
          {
            name: "Edit Game",
            href: {
              pathname: `/admin/games/edit/${data?.id}`,
            },

            isCurrentPage: true,
          },
        ]}
      />
      <LayoutHeader
        title={`Edit Game - ${form.getFieldValue("name")}`}
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
