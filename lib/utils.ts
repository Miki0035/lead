import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formateDate(isoString: string) {
  const date = new Date(isoString)

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short", // "Jan", "Feb", ...
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}