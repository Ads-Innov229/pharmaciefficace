/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/(\d{2})(?=(\d{2})+(?!\d))/g, '$1 ');
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) {
  let timeoutId: number | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}
