import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FallBackImage } from "@/public/images";
import { env } from "../env";
import { ImageLoader, ImageLoaderProps } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImage(
  url: string | undefined,
  type?: "src" | "static-image"
) {
  if (!url) {
    if (type === "static-image") return FallBackImage;
    return FallBackImage.src;
  }
  return `${env.IMAGE_URL}/${url}`;
}

export const imageLoader: ImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  return `${env.IMAGE_URL}/${src}?w=${width}&q=${quality || 75}`;
};
