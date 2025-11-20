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

export function cleanData<T>(input: T): T {
  if (Array.isArray(input)) {
    const cleaned = input
      .map((item) => cleanData(item))
      .filter((item) => !isEmpty(item));
    return cleaned as T;
  }

  if (input !== null && typeof input === "object") {
    const obj = input as Record<string, object>;
    const cleanedObj: Record<string, object> = {};

    for (const key of Object.keys(obj)) {
      const cleanedValue = cleanData(obj[key]);
      if (!isEmpty(cleanedValue)) {
        cleanedObj[key] = cleanedValue;
      }
    }

    return cleanedObj as T;
  }

  return input;
}

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
}
