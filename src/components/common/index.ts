// ===== INDEX.TS - Version Complète ===
// Import all components
import { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button';
import { Card, CardHeader, CardBody, CardFooter, type CardProps, type CardHeaderProps, type CardFooterProps } from './Card';
import { Loading } from './Loading';
import { Toast, type ToastProps } from './Toast';
import { ToastContainer, type ToastItem } from './ToastContainer';
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb';

// Re-export all components
export {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Loading,
  Toast,
  ToastContainer,
  Breadcrumb
};

// Export all types
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  CardProps,
  CardHeaderProps,
  CardFooterProps,
  ToastProps,
  ToastItem,
  BreadcrumbItem
};

// Set display names
if (typeof Card !== 'undefined') Card.displayName = 'Card';
if (typeof CardHeader !== 'undefined') CardHeader.displayName = 'CardHeader';
if (typeof CardBody !== 'undefined') CardBody.displayName = 'CardBody';
if (typeof CardFooter !== 'undefined') CardFooter.displayName = 'CardFooter';
if (typeof Button !== 'undefined') Button.displayName = 'Button';
if (typeof Loading !== 'undefined') Loading.displayName = 'Loading';
if (typeof Toast !== 'undefined') Toast.displayName = 'Toast';
if (typeof ToastContainer !== 'undefined') ToastContainer.displayName = 'ToastContainer';
if (typeof Breadcrumb !== 'undefined') Breadcrumb.displayName = 'Breadcrumb';