declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    className?: string;
  }

  // Icons used in the application
  // Navigation
  export const Search: ComponentType<IconProps>;
  export const Filter: ComponentType<IconProps>;
  export const ChevronDown: ComponentType<IconProps>;
  export const ChevronLeft: ComponentType<IconProps>;
  export const ChevronRight: ComponentType<IconProps>;
  export const ChevronUp: ComponentType<IconProps>;
  export const ArrowLeft: ComponentType<IconProps>;
  export const ArrowRight: ComponentType<IconProps>;
  export const Menu: ComponentType<IconProps>;
  export const X: ComponentType<IconProps>;
  export const Home: ComponentType<IconProps>;
  
  // User & Auth
  export const User: ComponentType<IconProps>;
  export const UserPlus: ComponentType<IconProps>;
  export const LogIn: ComponentType<IconProps>;
  export const LogOut: ComponentType<IconProps>;
  export const Lock: ComponentType<IconProps>;
  export const Mail: ComponentType<IconProps>;
  export const MailOpen: ComponentType<IconProps>;
  export const Eye: ComponentType<IconProps>;
  export const EyeOff: ComponentType<IconProps>;
  export const Check: ComponentType<IconProps>;
  export const CheckCircle: ComponentType<IconProps>;
  export const AlertTriangle: ComponentType<IconProps>;
  export const AlertCircle: ComponentType<IconProps>;
  export const Shield: ComponentType<IconProps>;
  
  // Business
  export const Building2: ComponentType<IconProps>;
  export const Building: ComponentType<IconProps>;
  export const Phone: ComponentType<IconProps>;
  export const MapPin: ComponentType<IconProps>;
  export const Clock: ComponentType<IconProps>;
  export const Calendar: ComponentType<IconProps>;
  export const Star: ComponentType<IconProps>;
  export const Heart: ComponentType<IconProps>;
  export const MessageSquare: ComponentType<IconProps>;
  export const BarChart2: ComponentType<IconProps>;
  export const BarChart3: ComponentType<IconProps>;
  export const Users: ComponentType<IconProps>;
  export const Copy: ComponentType<IconProps>;
  export const Download: ComponentType<IconProps>;
  export const RefreshCw: ComponentType<IconProps>;
  export const Zap: ComponentType<IconProps>;
  export const Crown: ComponentType<IconProps>;
  export const Quote: ComponentType<IconProps>;
  export const Facebook: ComponentType<IconProps>;
  export const Twitter: ComponentType<IconProps>;
  export const Linkedin: ComponentType<IconProps>;
  export const Instagram: ComponentType<IconProps>;
  export const Key: ComponentType<IconProps>;
  export const Globe: ComponentType<IconProps>;
  export const Loader: ComponentType<IconProps>;
  export const Loader2: ComponentType<IconProps>;
  export const TrendingUp: ComponentType<IconProps>;
  export const Activity: ComponentType<IconProps>;
  export const ArrowUpRight: ComponentType<IconProps>;
  export const ArrowDownRight: ComponentType<IconProps>;
  export const Play: ComponentType<IconProps>;
  export const Navigation: ComponentType<IconProps>;
  
  // Actions
  export const Plus: ComponentType<IconProps>;
  export const PlusCircle: ComponentType<IconProps>;
  export const Minus: ComponentType<IconProps>;
  export const Edit: ComponentType<IconProps>;
  export const Trash2: ComponentType<IconProps>;
  export const Upload: ComponentType<IconProps>;
  export const Download: ComponentType<IconProps>;
  export const Save: ComponentType<IconProps>;
  export const Settings: ComponentType<IconProps>;
  export const LogOut: ComponentType<IconProps>;
  
  // Data & Media
  export const FileText: ComponentType<IconProps>;
  export const File: ComponentType<IconProps>;
  export const FilePlus: ComponentType<IconProps>;
  export const Image: ComponentType<IconProps>;
  export const BarChart2: ComponentType<IconProps>;
  export const PieChart: ComponentType<IconProps>;
  export const LineChart: ComponentType<IconProps>;
  export const QrCode: ComponentType<IconProps>;
  
  // Status
  export const CheckCircle: ComponentType<IconProps>;
  export const XCircle: ComponentType<IconProps>;
  export const AlertCircle: ComponentType<IconProps>;
  export const AlertTriangle: ComponentType<IconProps>;
  export const Info: ComponentType<IconProps>;
  
  // Other
  export const Users: ComponentType<IconProps>;
  export const UserCheck: ComponentType<IconProps>;
  export const UserX: ComponentType<IconProps>;
  export const Bell: ComponentType<IconProps>;
  export const HelpCircle: ComponentType<IconProps>;
  export const ExternalLink: ComponentType<IconProps>;
  export const Link: ComponentType<IconProps>;
  export const Loader: ComponentType<IconProps>;
  export const MoreHorizontal: ComponentType<IconProps>;
  export const MoreVertical: ComponentType<IconProps>;
}
