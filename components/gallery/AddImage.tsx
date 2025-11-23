import { useCreateManyImages } from "@/hooks/queries/gallery";
import { Delete, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";

export default function AddImage() {
  const { mutate, isPending } = useCreateManyImages();
  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const handleUpload = () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image.file as Blob);
    });
    mutate(formData, {
      onSuccess: () => {
        setImages([]);
      },
    });
  };
  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={10}
      >
        {({
          imageList,
          onImageUpload,
          isDragging,
          dragProps,
          onImageRemove,
        }) => (
          <div className="upload__image-wrapper flex items-center gap-2">
            <div
              className="border border-dashed border-gray-300 p-2 size-[120px] grid place-items-center cursor-pointer hover:bg-gray-300"
              style={isDragging ? { color: "#acacac" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <div className="flex flex-col items-center gap-2">
                <Plus size={16} />
                <p className="text-sm font-semibold text-center">
                  Click or Drop here
                </p>
              </div>
            </div>
            {imageList.map((image, index) => (
              <div key={index} className="image-item flex  gap-2">
                {image.dataURL && (
                  <div className="w-[120px] relative">
                    <Delete
                      size={24}
                      color="white"
                      className="absolute -top-1.5 -right-2 z-10 fill-red-600 cursor-pointer"
                      onClick={() => onImageRemove(index)}
                    />
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={image.dataURL}
                        alt={image.file?.name ?? ""}
                        fill
                        className="object-center object-cover rounded-md"
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      {images.length > 0 && (
        <div>
          <Button disabled={isPending} onClick={handleUpload}>
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
