import type { StaticImageData } from "next/image";
import type { ImgHTMLAttributes } from "react";

import {
  DEFERRED_PLACEHOLDER_SRC,
  isEagerImageUrl,
} from "@/lib/deferred-image";
import { cn } from "@/components/ui";

type HomeStaticImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  /** When true, real URL is in src immediately (LCP / above-fold). */
  eager?: boolean;
};

export function HomeStaticImage({
  src,
  alt,
  className,
  width,
  height,
  fill,
  loading = "lazy",
  fetchPriority,
  eager = false,
}: HomeStaticImageProps) {
  const imgClassName = cn(fill && "absolute inset-0 h-full w-full", className);
  const sizeProps = fill
    ? {}
    : {
        width: width ?? src.width,
        height: height ?? src.height,
      };

  const useEager = eager || isEagerImageUrl(src.src);

  const common: ImgHTMLAttributes<HTMLImageElement> = {
    alt,
    className: imgClassName,
    decoding: "async",
    loading: useEager ? "eager" : loading,
    fetchPriority: useEager ? (fetchPriority ?? "high") : fetchPriority,
    ...sizeProps,
  };

  if (useEager) {
    return <img {...common} src={src.src} />;
  }

  return (
    <img
      {...common}
      src={DEFERRED_PLACEHOLDER_SRC}
      data-movyo-src={src.src}
      suppressHydrationWarning
    />
  );
}
