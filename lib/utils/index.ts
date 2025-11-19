import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FallBackImage } from "@/public/images";
import { env } from "../env";
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
  return `${env.IMAGE_URL}${url}`;
}
