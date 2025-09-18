// ===== BREADCRUMB.TSX - Version Optimisée =====
import type React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Activity } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'medical';
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  variant = 'default',
  className = ''
}) => {
  const HomeIcon = variant === 'medical' ? Activity : Home;

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-gray-600 mb-6 ${className}`}
      aria-label="Fil d'Ariane"
    >
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center hover:text-green-700 transition-colors duration-200
                     hover:bg-green-50 rounded-lg p-2 -m-2"
            aria-label="Retour à l'accueil"
          >
            <HomeIcon className="w-4 h-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.path || index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            {item.path ? (
              <Link 
                to={item.path}
                className="flex items-center hover:text-green-700 transition-colors duration-200
                         hover:bg-green-50 rounded-lg px-2 py-1 -m-1"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-semibold flex items-center px-2 py-1">
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};