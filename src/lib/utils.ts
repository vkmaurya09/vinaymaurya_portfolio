import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBasePath() {
  const isProduction = import.meta.env.PROD;
  const isGitHubPages = typeof window !== 'undefined' && window.location.href.includes('github.io');
  
  if (isProduction && isGitHubPages) {
    return '/vinaymaurya_portfolio';
  }
  
  return '';
}

export function getImagePath(path: string) {
  return `${getBasePath()}${path}`;
}
