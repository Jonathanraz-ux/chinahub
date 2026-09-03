import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm text-chm-text-light flex-wrap gap-1">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-chm-text-light/50" />}
          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-chm-red transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-chm-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
