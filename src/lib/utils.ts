import { Issue } from "@/type";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortByDate<T extends Record<K, string>, K extends keyof T>(
  items: T[],
  dateKey: K,
  descending = true
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateKey]).getTime();
    const dateB = new Date(b[dateKey]).getTime();
    return descending ? dateB - dateA : dateA - dateB;
  });
}

export function filterIssuesByStatus(
  issues: Issue[],
  status: string
): Issue[]{
  return [...issues].filter(i => i.status === status);
}

export function updateItemInList<T extends { id: string | number }>(
  list: T[],
  id: T["id"],
  update: Partial<T>
): T[] {
  return list.map(item =>
    item.id === id ? { ...item, ...update } : item
  );
}
