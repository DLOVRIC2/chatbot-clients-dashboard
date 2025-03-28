import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeFromSidebarTimeTitle(menu_title: string) {
  let time = null; //this means today in the api
  switch (menu_title) {
    case "Today":
      time = null;
      break;
    case "Last 7 Days":
      time = "7days";
      break;
    case "Last 30 Days":
      time = "30days";
      break;

    default:
      break;
  }
  return time;
}

export const getUserInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
