import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Decode common HTML entities (e.g. `&amp;`, `&#39;`, `&quot;`). Safe for SSR-less browser rendering. */
export function decodeHtmlEntities(input: string | null | undefined): string {
  if (!input) return "";
  if (typeof document === "undefined") {
    return input
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
  const t = document.createElement("textarea");
  t.innerHTML = input;
  return t.value;
}
