import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type URLInfo = {
  baseURL: string;
  username: string;
  password: string;
  path?: string;
};

// Parses a raw URL string and extracts the base URL, username, and password.
export function parseStreamURL(raw: string): URLInfo | null {
  try {
    const u = new URL(raw);
    return {
      baseURL: `${u.origin}`,
      username: u.searchParams.get("username") ?? "",
      password: u.searchParams.get("password") ?? "",
      path: u.pathname,
    };
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

// Copy text to clipboard utility function
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
    return true;
  } catch (err) {
    toast.error(`Failed to copy: ${err}`);
    return false;
  }
}
