/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function getDiff<T extends Record<string, any>>(oldRow: T, newRow: T) {
  const diff: Record<string, { old: any; new: any }> = {}

  for (const key in newRow) {
    if (newRow[key] !== oldRow[key]) {
      diff[key] = {
        old: oldRow[key],
        new: newRow[key],
      }
    }
  }

  return diff
}