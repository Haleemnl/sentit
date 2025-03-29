import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// to get current date
export function formatDate() {
  return new Date().toLocaleDateString({
    locale: 'en-Us', options: {
      month: 'long',
      day: 'numberic',
      year: 'numberic',
    }
  })
}

export function parseServerActionResponse(response) {
  return JSON.parse(JSON.stringify(response));
}