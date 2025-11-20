import { ImageType } from "@/lib/types";
import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
type Props = {
  image: ImageType;
};

export default function GalleryListItem({ image }: Props) {
  return (
    <div className="flex flex-col rounded-sm items-center w-[100px] md:w-[200px] gap-2 border border-gray-400 shadow-2xl p-2">
      <AspectRatio ratio={1 / 1}>
        <Image
          src={image.url}
          alt={image.fileName}
          fill
          loader={imageLoader}
          className="object-contain object-center"
        />
      </AspectRatio>
    </div>
  );
}
