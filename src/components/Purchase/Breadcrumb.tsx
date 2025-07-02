import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    { label: 'Home', path: '/', icon: Home },
    ...pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return { label, path };
    })
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm font-roboto py-4">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />
          )}
          {index === breadcrumbItems.length - 1 ? (
            <span style={{ color: 'var(--color-foreground)' }} className="font-medium">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:underline transition-colors flex items-center space-x-1"
              style={{ color: 'var(--color-primary)' }}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;