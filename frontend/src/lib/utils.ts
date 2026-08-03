import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBackendAssetUrl(assetPath?: string | null) {
  if (!assetPath) return "";

  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath;
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  const normalizedPath = assetPath
    .replace(/\\/g, "/")
    .replace(/^.*?\/uploads\//, "/uploads/")
    .replace(/^.*?uploads\//, "/uploads/");

  if (!apiUrl) return normalizedPath;

  const origin = new URL(apiUrl).origin;

  return `${origin}${normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`}`;
}
