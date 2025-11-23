import { useDeleteImage } from "@/hooks/queries/gallery";
import { ImageType } from "@/lib/types";
import { imageLoader } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
type Props = {
  image: ImageType;
};

export default function GalleryListItem({ image }: Props) {
  const { mutate, isPending } = useDeleteImage(image.id.toString());

  const onDelete = () => {
    mutate();
  };

  return (
    <div className=" group relative flex flex-col rounded-sm items-center w-[100px] md:w-[200px] gap-2 border border-gray-400 shadow-2xl p-2  ">
      <div className="hidden group-hover:block group-hover:absolute bg-black/40 inset-0 w-[100px] md:w-[200px] z-10 rounded-sm border border-gray-400"></div>
      <AspectRatio ratio={1 / 1}>
        <Image
          src={image.url}
          alt={image.fileName}
          fill
          loader={imageLoader}
          className="object-contain object-center group-hover:z-0"
        />
        <Button
          disabled={isPending}
          variant="secondary"
          className="absolute top-2 right-2 pointer z-20 hidden group-hover:block"
          onClick={onDelete}
        >
          <Trash2 className="fill-red-400 " />
        </Button>
      </AspectRatio>
    </div>
  );
}
