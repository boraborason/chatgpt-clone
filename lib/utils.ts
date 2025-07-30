import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) { //cn함수: 스타일을 동적적용, 조건부로 적용하기 위한 함수 
  return twMerge(clsx(inputs))
}
