import * as LucideIcons from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

// Safe icon resolver - maps icon name strings to actual components
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<string, IconType> = {
  Home: LucideIcons.Home,
  FolderOpen: LucideIcons.FolderOpen,
  Wrench: LucideIcons.Wrench,
  User: LucideIcons.User,
  Search: LucideIcons.Search,
  Sun: LucideIcons.Sun,
  Moon: LucideIcons.Moon,
  Monitor: LucideIcons.Monitor,
  Menu: LucideIcons.Menu,
  X: LucideIcons.X,
  ArrowUp: LucideIcons.ArrowUp,
  Calendar: LucideIcons.Calendar,
  Clock: LucideIcons.Clock,
  Tag: LucideIcons.Tag,
  Copy: LucideIcons.Copy,
  Check: LucideIcons.Check,
  ArrowLeftRight: LucideIcons.ArrowLeftRight,
  ChevronLeft: LucideIcons.ChevronLeft,
  ChevronRight: LucideIcons.ChevronRight,
  Heart: LucideIcons.Heart,
  CreditCard: LucideIcons.CreditCard,
  MessageSquare: LucideIcons.MessageSquare,
  Send: LucideIcons.Send,
  Mail: LucideIcons.Mail,
  Github: LucideIcons.Github,
  Braces: LucideIcons.Braces,
  FileDiff: LucideIcons.FileDiff,
  Link: LucideIcons.Link,
  Palette: LucideIcons.Palette,
  Globe: LucideIcons.Globe,
  Minimize2: LucideIcons.Minimize2,
  Maximize2: LucideIcons.Maximize2,
};

export function getIcon(name: string): IconType {
  return iconMap[name] || LucideIcons.Globe;
}

export { LucideIcons };
