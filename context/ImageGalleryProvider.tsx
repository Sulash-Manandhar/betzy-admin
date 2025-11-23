"use client";
import { Spinner } from "@/components/ui/spinner";
import { useGalleryImage } from "@/hooks/queries/gallery";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { ImageType } from "@lib/types";
import { cn, imageLoader } from "@lib/utils";
import { FallBackImage } from "@public/images";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, {
  createContext,
  JSX,
  PropsWithChildren,
  useContext,
} from "react";

type ContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedImage: ImageType | null;
  ImageSelector: JSX.Element;
  clearSelectImage: () => void;
  setDefaultImage: (image: ImageType | null) => void;
};

const ImageGalleryContext = createContext<null | ContextType>(null);

export const useImageGallery = () => {
  const context = useContext(ImageGalleryContext);
  if (!context) {
    throw new Error(
      "useImageGallery must be used within a ImageGalleryProvider"
    );
  }
  return context;
};

type Props = {
  selectedImage: ImageType | null;
  onSelectImage: (image: ImageType | null) => void;
  item: ImageType;
};

function ImageListItem({ item, selectedImage, onSelectImage }: Props) {
  return (
    <div
      key={item.id}
      className={cn(
        "flex flex-col items-center w-[60px] gap-1 border-2 rounded-md p-0.5",
        selectedImage?.id === item.id && "border-primary"
      )}
      onClick={() => onSelectImage(item)}
    >
      <AspectRatio key={item.id} ratio={1 / 1}>
        <Image
          src={item.url}
          alt={item.fileName}
          fill
          onError={(e) => {
            e.currentTarget.src = FallBackImage.src;
          }}
          className="object-cover object-center rounded-md"
          loader={imageLoader}
        />
      </AspectRatio>
    </div>
  );
}

type ImageSelectorProps = {
  onOpen: () => void;
  selectedImage: ImageType | null;
};

function ImageSelector({ onOpen, selectedImage }: ImageSelectorProps) {
  if (selectedImage) {
    return (
      <div
        className="relative size-[200px] p-4 grid place-items-center border border-dashed cursor-pointer"
        onClick={() => onOpen()}
      >
        <Image
          src={selectedImage.url}
          alt={selectedImage.fileName}
          fill
          className="object-cover object-center rounded-md"
          loader={imageLoader}
        />
      </div>
    );
  }
  return (
    <div
      className="size-[200px] p-4 grid place-items-center border border-dashed cursor-pointer"
      onClick={() => onOpen()}
    >
      <div className="flex flex-col gap-2 items-center">
        <Plus />
        <p className="text-sm">Select image</p>
      </div>
    </div>
  );
}

export default function ImageGalleryProvider({ children }: PropsWithChildren) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [selectImage, setSelectImage] = React.useState<ImageType | null>(null);

  const { data, isLoading } = useGalleryImage({ page: 1, limit: 3000 });

  const onSelectImage = (image: ImageType | null) => {
    setSelectImage(image);
  };

  const setDefaultImage = (image: ImageType | null) => {
    setSelectImage(image);
  };
  const clearSelectImage = () => {
    setSelectImage(null);
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center w-full h-dvh">
        <Spinner />
      </div>
    );
  }
  return (
    <ImageGalleryContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        selectedImage: selectImage,
        ImageSelector: (
          <ImageSelector onOpen={onOpen} selectedImage={selectImage} />
        ),
        clearSelectImage,
        setDefaultImage,
      }}
    >
      <AlertDialog open={isOpen} onOpenChange={() => onToggle()}>
        <AlertDialogContent className="w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>Image Gallery</AlertDialogTitle>
            <AlertDialogDescription>
              Select image to continue
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="border p-2 rounded-md grid grid-cols-3 gap-2 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
            {data?.list?.map((item) => (
              <ImageListItem
                key={item.id}
                item={item}
                selectedImage={selectImage}
                onSelectImage={onSelectImage}
              />
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {children}
    </ImageGalleryContext.Provider>
  );
}
